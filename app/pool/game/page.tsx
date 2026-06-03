"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { io } from "socket.io-client";

const SOCKET_URL = "https://heiyu-pool-server.onrender.com";

const TABLE_WIDTH = 1000;
const TABLE_HEIGHT = 560;
const BALL_RADIUS = 16;

type PoolBallType = "solid" | "stripe" | "black";

type PoolBall = {
  id: number;
  number: number;
  type: PoolBallType;
  color: string;
  x: number;
  y: number;
  potted: boolean;
};

const POCKET_RADIUS = 48;

const POCKETS = [
  { x: 92, y: 86 },
  { x: TABLE_WIDTH / 2, y: 78 },
  { x: TABLE_WIDTH - 92, y: 86 },
  { x: 92, y: TABLE_HEIGHT - 86 },
  { x: TABLE_WIDTH / 2, y: TABLE_HEIGHT - 78 },
  { x: TABLE_WIDTH - 92, y: TABLE_HEIGHT - 86 },
];

const createRackBalls = (): PoolBall[] => {
  const startX = TABLE_WIDTH / 2 + 150;
  const startY = TABLE_HEIGHT / 2;

  const ballGap = BALL_RADIUS * 2.02;
  const gapX = ballGap * 0.866;
  const gapY = ballGap;

  const rack: number[][] = [
    [1],
    [9, 2],
    [3, 8, 10],
    [11, 4, 12, 5],
    [6, 13, 7, 14, 15],
  ];

  const colors: Record<number, string> = {
    1: "#facc15",
    2: "#2563eb",
    3: "#dc2626",
    4: "#7c3aed",
    5: "#f97316",
    6: "#16a34a",
    7: "#7f1d1d",
    8: "#000000",
    9: "#facc15",
    10: "#2563eb",
    11: "#dc2626",
    12: "#7c3aed",
    13: "#f97316",
    14: "#16a34a",
    15: "#7f1d1d",
  };

  const getBallType = (number: number): PoolBallType => {
  if (number === 8) return "black";
  if (number <= 7) return "solid";
  return "stripe";
};

  const balls: PoolBall[] = [];

  rack.forEach((row, rowIndex) => {
    row.forEach((number, colIndex) => {
    const x = startX + rowIndex * gapX;
const y =
  startY -
  ((row.length - 1) * gapY) / 2 +
  colIndex * gapY;

      balls.push({
        id: number,
        number,
        type: getBallType(number),
        color: colors[number],
        x,
        y,
        potted: false,
      });
    });
  });

  return balls;
};

export default function PoolGamePage() {
  const [aim, setAim] = useState(0);
  const [power, setPower] = useState(80);
 const [ball, setBall] = useState({ x: TABLE_WIDTH * 0.28, y: TABLE_HEIGHT / 2 });


  const [isMoving, setIsMoving] = useState(false);
const isMovingRef = useRef(false);
  const [roomPin, setRoomPin] = useState("----");
  const [cueStriking, setCueStriking] = useState(false);

  const engineRef = useRef<Matter.Engine | null>(null);
  const cueBallRef = useRef<Matter.Body | null>(null);
  const aimRef = useRef(0);
  const powerRef = useRef(80);
  const [balls, setBalls] = useState<PoolBall[]>([]);
  const [pottedBallIds, setPottedBallIds] = useState<number[]>([]);
  const [pottedBalls, setPottedBalls] = useState<PoolBall[]>([]);
  const [tableOpen, setTableOpen] = useState(true);
  const tableOpenRef = useRef(true);
  const [playerOneGroup, setPlayerOneGroup] = useState<PoolBallType | null>(null);
  const [playerTwoGroup, setPlayerTwoGroup] = useState<PoolBallType | null>(null);
  const playerOneGroupRef = useRef<PoolBallType | null>(null);
  const playerTwoGroupRef = useRef<PoolBallType | null>(null);

  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [winner, setWinner] = useState<1 | 2 | null>(null);
  const winnerRef = useRef<1 | 2 | null>(null);
  
  const [gameMessage, setGameMessage] = useState("");
  const currentPlayerRef = useRef<1 | 2>(1);

 const hasClearedGroup = (player: 1 | 2, currentBalls: PoolBall[]) => {
 const group =
  player === 1 ? playerOneGroupRef.current : playerTwoGroupRef.current;

  if (!group || group === "black") return false;

  return currentBalls
    .filter((ball) => ball.type === group)
    .every((ball) => ball.potted);
};


  const switchPlayer = () => {
  const nextPlayer = currentPlayerRef.current === 1 ? 2 : 1;

  currentPlayerRef.current = nextPlayer;
  setCurrentPlayer(nextPlayer);
};

  const [shotPottedBall, setShotPottedBall] = useState(false);
  const shotPottedBallRef = useRef(false);
  const ballsRef = useRef<Matter.Body[]>([]);

  useEffect(() => {
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0 },
    });

    engineRef.current = engine;

    const wallOptions = {
      isStatic: true,
      restitution: 0.9,
      friction: 0,
    };

   const cushionInset = 38;

const topWall = Matter.Bodies.rectangle(
  TABLE_WIDTH / 2,
  82,
  TABLE_WIDTH - 150,
  30,
  wallOptions
);

const bottomWall = Matter.Bodies.rectangle(
  TABLE_WIDTH / 2,
  TABLE_HEIGHT - 82,
  TABLE_WIDTH - 150,
  30,
  wallOptions
);

const leftWall = Matter.Bodies.rectangle(
  82,
  TABLE_HEIGHT / 2,
  30,
  TABLE_HEIGHT - 150,
  wallOptions
);

const rightWall = Matter.Bodies.rectangle(
  TABLE_WIDTH - 82,
  TABLE_HEIGHT / 2,
  30,
  TABLE_HEIGHT - 150,
  wallOptions
);

   const cueBall = Matter.Bodies.circle(TABLE_WIDTH * 0.28, TABLE_HEIGHT / 2, BALL_RADIUS, {
      restitution: 0.92,
      friction: 0,
    frictionAir: 0.006,
      density: 0.004,
    });

    cueBallRef.current = cueBall;

    const rackBalls = createRackBalls();

const rackBodies = rackBalls.map((ball) =>
  Matter.Bodies.circle(ball.x, ball.y, BALL_RADIUS, {
    restitution: 0.95,
    friction: 0.01,
    frictionAir: 0.01,
  })
);

ballsRef.current = rackBodies;
setBalls(rackBalls);

Matter.World.add(engine.world, [
  cueBall,
  ...rackBodies,
  topWall,
  bottomWall,
  leftWall,
  rightWall,
]);


    return () => {
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pin = params.get("pin") || "";

    setRoomPin(pin || "----");

    const socket = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => {
      if (pin) {
        socket.emit("tv:join-room", { pin });
      }
    });

    socket.on("game:aim-left", () => {
      aimRef.current -= 5;
      setAim(aimRef.current);
    });

    socket.on("game:aim-right", () => {
      aimRef.current += 5;
      setAim(aimRef.current);
    });

    socket.on("game:aim-angle", (data: { aim: number }) => {
  aimRef.current = data.aim;
  setAim(data.aim);
});

    socket.on("game:power", (data: { power: number }) => {
      powerRef.current = data.power;
      setPower(data.power);
    });

    socket.on("game:shoot", () => {
      const cueBall = cueBallRef.current;
      if (!cueBall) return;
     if (winnerRef.current) return;

      const speed = Math.hypot(cueBall.velocity.x, cueBall.velocity.y);
      if (speed > 0.15) return;

      const radians = (aimRef.current * Math.PI) / 180;
     const force = Math.max(0.03, powerRef.current * 0.0015);
shotPottedBallRef.current = false;
setShotPottedBall(false);
 setCueStriking(true);

setTimeout(() => {
  Matter.Body.applyForce(cueBall, cueBall.position, {
  x: Math.cos(radians) * force,
  y: Math.sin(radians) * force,
  });

  setTimeout(() => {
    setCueStriking(false);
  }, 180);
}, 140);
    
    });

    return () => {
      socket.disconnect();
    };
  }, []);

useEffect(() => {
  const frame = setInterval(() => {
    const engine = engineRef.current;
    const cueBall = cueBallRef.current;
  

    if (!engine || !cueBall) return;

    Matter.Engine.update(engine, 1000 / 60);

    const speed = Math.hypot(cueBall.velocity.x, cueBall.velocity.y);
    
if (speed < 0.08) {
  Matter.Body.setVelocity(cueBall, { x: 0, y: 0 });
  Matter.Body.setAngularVelocity(cueBall, 0);

if (isMovingRef.current && !shotPottedBallRef.current) {
  switchPlayer();
}

  isMovingRef.current = false;
  setIsMoving(false);
} else {
  isMovingRef.current = true;
  setIsMoving(true);
}

setBall({
  x: cueBall.position.x,
  y: cueBall.position.y,
});

    setBalls((previousBalls) =>
  previousBalls.map((poolBall, index) => {
    const body = ballsRef.current[index];

    if (!body) {
      return poolBall;
    }

    const pocket = POCKETS.find((pocket) => {
      const dx = body.position.x - pocket.x;
      const dy = body.position.y - pocket.y;

      return Math.sqrt(dx * dx + dy * dy) < POCKET_RADIUS;
    });

   if (pocket && !poolBall.potted) {
      Matter.World.remove(engine.world, body);
      if (poolBall.type === "black") {
  const clearedGroup = hasClearedGroup(currentPlayerRef.current, previousBalls);

  if (clearedGroup) {
   winnerRef.current = currentPlayerRef.current;
setWinner(currentPlayerRef.current);
    setGameMessage(`Player ${currentPlayerRef.current} wins`);
  } else {
    const otherPlayer = currentPlayerRef.current === 1 ? 2 : 1;
   winnerRef.current = otherPlayer;
winnerRef.current = otherPlayer;
setWinner(otherPlayer);
setGameMessage(`Player ${otherPlayer} wins — black potted early`);
  }
}
      shotPottedBallRef.current = true;
setShotPottedBall(true);
     if (tableOpenRef.current && poolBall.type !== "black") {
 if (poolBall.type === "solid") {
  playerOneGroupRef.current = "solid";
  playerTwoGroupRef.current = "stripe";

  setPlayerOneGroup("solid");
  setPlayerTwoGroup("stripe");
}

if (poolBall.type === "stripe") {
  playerOneGroupRef.current = "stripe";
  playerTwoGroupRef.current = "solid";

  setPlayerOneGroup("stripe");
  setPlayerTwoGroup("solid");
}

 tableOpenRef.current = false;
setTableOpen(false);
}

   setPottedBallIds((current) =>
  current.includes(poolBall.id) ? current : [...current, poolBall.id]
);

setPottedBalls((current) =>
  current.some((ball) => ball.id === poolBall.id)
    ? current
    : [...current, poolBall]
);

      return {
        ...poolBall,
        potted: true,
      };
    }

    return {
      ...poolBall,
      x: body.position.x,
      y: body.position.y,
    };
  })
);

 
  }, 1000 / 60);

return () => clearInterval(frame);
}, []);

  const ballXPercent = (ball.x / TABLE_WIDTH) * 100;
  const ballYPercent = (ball.y / TABLE_HEIGHT) * 100;

 const getAimLineLength = () => {
  const radians = (aim * Math.PI) / 180;

  const startX = ball.x;
  const startY = ball.y;

  const dirX = Math.cos(radians);
  const dirY = Math.sin(radians);

  const leftLimit = 82;
  const rightLimit = TABLE_WIDTH - 82;
  const topLimit = 82;
  const bottomLimit = TABLE_HEIGHT - 82;

  let distance = 2000;

  if (dirX > 0) distance = Math.min(distance, (rightLimit - startX) / dirX);
  if (dirX < 0) distance = Math.min(distance, (leftLimit - startX) / dirX);
  if (dirY > 0) distance = Math.min(distance, (bottomLimit - startY) / dirY);
  if (dirY < 0) distance = Math.min(distance, (topLimit - startY) / dirY);

  const liveBalls = balls.filter((poolBall) => !poolBall.potted);

  for (const target of liveBalls) {
    const toBallX = target.x - startX;
    const toBallY = target.y - startY;

    const projection = toBallX * dirX + toBallY * dirY;

    if (projection <= BALL_RADIUS) continue;
    if (projection >= distance) continue;

    const closestX = startX + dirX * projection;
    const closestY = startY + dirY * projection;

    const dx = target.x - closestX;
    const dy = target.y - closestY;

    const distanceToLine = Math.sqrt(dx * dx + dy * dy);

    if (distanceToLine <= BALL_RADIUS) {
      distance = projection - BALL_RADIUS;
    }
  }

  return Math.max(40, distance);
};

const aimLineLength = getAimLineLength();
const aimRadians = (aim * Math.PI) / 180;
const aimDirX = Math.cos(aimRadians);
const aimDirY = Math.sin(aimRadians);

const aimStartX = ball.x + aimDirX * (BALL_RADIUS + 8);
const aimStartY = ball.y + aimDirY * (BALL_RADIUS + 8);
const aimEndX = ball.x + aimDirX * aimLineLength;
const aimEndY = ball.y + aimDirY * aimLineLength;

const cueTipGap = cueStriking ? 6 : 34;
const cueTipX = ball.x - aimDirX * (BALL_RADIUS + cueTipGap);
const cueTipY = ball.y - aimDirY * (BALL_RADIUS + cueTipGap);
const cueBackX = ball.x - aimDirX * 300;
const cueBackY = ball.y - aimDirY * 300;

return (
  <main className="flex min-h-screen items-center justify-center bg-[#07140f] p-8">
   <div className="relative aspect-[2/1] w-[96vw] max-w-[1800px] overflow-hidden rounded-[28px] shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
      <img
        src="/pool/table-bg.jpg"
        alt=""
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-fill"
      />

<div className="absolute bottom-3 left-[450px] z-40 rounded-2xl bg-black/40 px-4 py-3 backdrop-blur">
  <p className="mb-2 text-xs font-black uppercase tracking-wider text-white/70">
    Potted
  </p>

  <p className="mb-2 text-center text-xs text-white">
  {tableOpen
    ? "Open Table"
    : `P1: ${playerOneGroup} | P2: ${playerTwoGroup}`}
</p>
  

 <div className="flex flex-wrap gap-2">
  {pottedBalls.map((poolBall, index) => {
    const isStripe = poolBall.type === "stripe";
    const isBlack = poolBall.type === "black";

    return (
      <div
        key={`${poolBall.id}-${index}`}
        className="relative flex items-center justify-center overflow-hidden rounded-full text-[10px] font-black shadow-lg ring-2 ring-white/40"
        style={{
          width: `${BALL_RADIUS * 2}px`,
          height: `${BALL_RADIUS * 2}px`,
          background: isBlack ? "#000000" : isStripe ? "#ffffff" : poolBall.color,
          color: isBlack ? "#ffffff" : "#000000",
        }}
      >
        {isStripe && (
          <div
            className="absolute left-0 right-0 top-1/2 h-3 -translate-y-1/2"
            style={{ background: poolBall.color }}
          />
        )}

        <span className="relative z-10">{poolBall.number}</span>
      </div>
    );
  })}
</div>
</div>

<button
  type="button"
  onClick={() => {
    window.location.href = "/pool/tv";
  }}
  className="absolute right-6 top-6 z-20 rounded-2xl bg-white/90 px-6 py-4 text-xl font-black text-[#07140f] shadow-lg hover:bg-white"
>
  New Game
</button>
<div className="absolute left-1/2 top-6 z-30 -translate-x-1/2 rounded-2xl bg-emerald-400/20 px-6 py-3 text-lg font-black text-emerald-200 backdrop-blur">
{winner && gameMessage.includes("black potted early") ? (
  <span className="flex items-center gap-3">
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm font-black text-white ring-2 ring-white/40">
      8
    </span>
    <span>{gameMessage.replace(" — ", " ")}</span>
  </span>
) : winner ? (
  gameMessage
) : (
  `Player ${currentPlayer} to shoot`
)}
</div>
        <div className="absolute left-6 top-6 rounded-xl bg-black/30 px-4 py-3 text-white">
          <div className="text-xs uppercase text-white/60">Room</div>
          <div className="text-xl font-black">{roomPin}</div>

          <div className="mt-2 text-xs uppercase text-white/60">Aim</div>
          <div className="text-3xl font-black">{aim}°</div>

          <div className="mt-2 text-xs uppercase text-white/60">Power</div>
          <div className="text-2xl font-black">{power}%</div>

        <div className="mt-2 text-xs text-white/60">
  {isMoving ? "Ball moving" : "Ready"}
</div>

</div>

{!isMoving && !winner && (
  <svg
    className="pointer-events-none absolute inset-0 z-30 h-full w-full"
    viewBox={`0 0 ${TABLE_WIDTH} ${TABLE_HEIGHT}`}
    preserveAspectRatio="none"
  >
    <line
      x1={aimStartX}
      y1={aimStartY}
      x2={aimEndX}
      y2={aimEndY}
      stroke="rgba(255,255,255,0.75)"
      strokeWidth="2"
      strokeDasharray="6 6"
      strokeLinecap="round"
    />

<line
  x1={cueBackX}
  y1={cueBackY}
  x2={cueTipX}
  y2={cueTipY}
  stroke="#3b1d0b"
  strokeWidth="10"
  strokeLinecap="round"
/>

<line
  x1={cueBackX}
  y1={cueBackY}
  x2={cueTipX}
  y2={cueTipY}
  stroke="#d6a25a"
  strokeWidth="6"
  strokeLinecap="round"
/>

    <line
      x1={cueTipX - aimDirX * 12}
      y1={cueTipY - aimDirY * 12}
      x2={cueTipX}
      y2={cueTipY}
      stroke="#f3d6a2"
      strokeWidth="7"
      strokeLinecap="round"
    />
  </svg>
)}

      {/* Cue ball */}
<div
  className="absolute z-30 rounded-full bg-white shadow-lg"
  style={{
    left: `${ballXPercent}%`,
    top: `${ballYPercent}%`,
   width: "2.35%",
   aspectRatio: "1 / 1",
    transform: "translate(-50%, -50%)",
  }}
/>

{/* Full rack balls */}
{balls.map((poolBall) => {
  const xPercent = (poolBall.x / TABLE_WIDTH) * 100;
  const yPercent = (poolBall.y / TABLE_HEIGHT) * 100;

  if (poolBall.potted) return null;

  const isStripe = poolBall.type === "stripe";
  const isBlack = poolBall.type === "black";

  return (
    <div
      key={poolBall.id}
      className="absolute z-30 flex items-center justify-center overflow-hidden rounded-full text-[10px] font-black text-black shadow-lg ring-2 ring-white/40"
      style={{
        left: `${xPercent}%`,
        top: `${yPercent}%`,
     width: "2.35%",
     aspectRatio: "1 / 1",
        transform: "translate(-50%, -50%)",
        background: isBlack ? "#000000" : isStripe ? "#ffffff" : poolBall.color,
        color: isBlack ? "#ffffff" : "#000000",
      }}
    >
      {isStripe && (
        <div
          className="absolute left-0 right-0 top-1/2 h-3 -translate-y-1/2"
          style={{ background: poolBall.color }}
        />
      )}

      <span className="relative z-10">{poolBall.number}</span>
    </div>
  );
})}
      </div>


    </main>
  );
}