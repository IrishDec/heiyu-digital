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

  const rack = [
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
        type:
          number === 8
            ? "black"
            : number <= 7
              ? "solid"
              : "stripe",
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
  const [blackBall, setBlackBall] = useState({
  x: TABLE_WIDTH / 2 + 220,
  y: TABLE_HEIGHT / 2,
});

const [solidBall, setSolidBall] = useState({
  x: TABLE_WIDTH / 2 + 120,
  y: TABLE_HEIGHT / 2 - 70,
});

const [stripeBall, setStripeBall] = useState({
  x: TABLE_WIDTH / 2 + 120,
  y: TABLE_HEIGHT / 2 + 70,
});

  const [isMoving, setIsMoving] = useState(false);
  const [blackBallPotted, setBlackBallPotted] = useState(false);
  const [solidBallPotted, setSolidBallPotted] = useState(false);
  const [stripeBallPotted, setStripeBallPotted] = useState(false);
  const [blackBallSinking, setBlackBallSinking] = useState(false);
  const [roomPin, setRoomPin] = useState("----");
  const [cueStriking, setCueStriking] = useState(false);

  const engineRef = useRef<Matter.Engine | null>(null);
  const cueBallRef = useRef<Matter.Body | null>(null);
  const blackBallRef = useRef<Matter.Body | null>(null);
  const solidBallRef = useRef<Matter.Body | null>(null);
  const stripeBallRef = useRef<Matter.Body | null>(null);
  const aimRef = useRef(0);
  const powerRef = useRef(80);
  const [balls, setBalls] = useState<PoolBall[]>([]);
  const [pottedBallIds, setPottedBallIds] = useState<number[]>([]);
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

    const blackBall = Matter.Bodies.circle(
  TABLE_WIDTH / 2 + 220,
  TABLE_HEIGHT / 2,
  BALL_RADIUS,
  {
    restitution: 0.92,
    friction: 0,
    frictionAir: 0.006,
    density: 0.001,
    inertia: Infinity,
  }
);

const solidBall = Matter.Bodies.circle(
  TABLE_WIDTH / 2 + 120,
  TABLE_HEIGHT / 2 - 70,
  BALL_RADIUS,
  {
    restitution: 0.95,
    friction: 0.01,
    frictionAir: 0.01,
  }
);

const stripeBall = Matter.Bodies.circle(
  TABLE_WIDTH / 2 + 120,
  TABLE_HEIGHT / 2 + 70,
  BALL_RADIUS,
  {
    restitution: 0.95,
    friction: 0.01,
    frictionAir: 0.01,
  }
);

solidBallRef.current = solidBall;
stripeBallRef.current = stripeBall;

blackBallRef.current = blackBall;

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

      const speed = Math.hypot(cueBall.velocity.x, cueBall.velocity.y);
      if (speed > 0.15) return;

      const radians = (aimRef.current * Math.PI) / 180;
     const force = Math.max(0.035, powerRef.current * 0.0018);

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
    const blackBall = blackBallRef.current;
    const solidBall = solidBallRef.current;
    const stripeBall = stripeBallRef.current;

    if (!engine || !cueBall) return;

    Matter.Engine.update(engine, 1000 / 60);

    const speed = Math.hypot(cueBall.velocity.x, cueBall.velocity.y);

    if (speed < 0.08) {
      Matter.Body.setVelocity(cueBall, { x: 0, y: 0 });
      Matter.Body.setAngularVelocity(cueBall, 0);
      setIsMoving(false);
    } else {
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

    if (pocket && !pottedBallIds.includes(poolBall.id)) {
      Matter.World.remove(engine.world, body);

      setPottedBallIds((current) => [...current, poolBall.id]);

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

    if (blackBall && !blackBallPotted && !blackBallSinking) {
      const pocket = POCKETS.find((pocket) => {
        const dx = blackBall.position.x - pocket.x;
        const dy = blackBall.position.y - pocket.y;
        return Math.sqrt(dx * dx + dy * dy) < POCKET_RADIUS;
      });

      if (pocket) {
        setBlackBallSinking(true);
        Matter.Body.setVelocity(blackBall, { x: 0, y: 0 });
        Matter.Body.setAngularVelocity(blackBall, 0);
        Matter.Body.setPosition(blackBall, pocket);
        setBlackBall({ x: pocket.x, y: pocket.y });

        setTimeout(() => {
          const engine = engineRef.current;
          if (engine) Matter.World.remove(engine.world, blackBall);
          blackBallRef.current = null;
          setBlackBallPotted(true);
        }, 450);
      } else {
        setBlackBall({
          x: blackBall.position.x,
          y: blackBall.position.y,
        });
      }
    }

    if (solidBall && !solidBallPotted) {
      const pocket = POCKETS.find((pocket) => {
        const dx = solidBall.position.x - pocket.x;
        const dy = solidBall.position.y - pocket.y;
        return Math.sqrt(dx * dx + dy * dy) < POCKET_RADIUS;
      });

      if (pocket) {
        Matter.World.remove(engine.world, solidBall);
        solidBallRef.current = null;
        setSolidBallPotted(true);
      } else {
        setSolidBall({
          x: solidBall.position.x,
          y: solidBall.position.y,
        });
      }
    }

    if (stripeBall && !stripeBallPotted) {
      const pocket = POCKETS.find((pocket) => {
        const dx = stripeBall.position.x - pocket.x;
        const dy = stripeBall.position.y - pocket.y;
        return Math.sqrt(dx * dx + dy * dy) < POCKET_RADIUS;
      });

      if (pocket) {
        Matter.World.remove(engine.world, stripeBall);
        stripeBallRef.current = null;
        setStripeBallPotted(true);
      } else {
        setStripeBall({
          x: stripeBall.position.x,
          y: stripeBall.position.y,
        });
      }
    }
  }, 1000 / 60);

  return () => clearInterval(frame);
}, [blackBallPotted, blackBallSinking, solidBallPotted, stripeBallPotted]);

  const ballXPercent = (ball.x / TABLE_WIDTH) * 100;
  const ballYPercent = (ball.y / TABLE_HEIGHT) * 100;
  const blackBallXPercent = (blackBall.x / TABLE_WIDTH) * 100;
  const blackBallYPercent = (blackBall.y / TABLE_HEIGHT) * 100;
  const getAimLineLength = () => {
  const radians = (aim * Math.PI) / 180;

  const startX = ball.x;
  const startY = ball.y;

  const dirX = Math.cos(radians);
  const dirY = Math.sin(radians);

  let maxDistance = 900;

  if (dirX > 0) {
    maxDistance = Math.min(maxDistance, (TABLE_WIDTH - 82 - startX) / dirX);
  }

  if (dirX < 0) {
    maxDistance = Math.min(maxDistance, (82 - startX) / dirX);
  }

  if (dirY > 0) {
    maxDistance = Math.min(maxDistance, (TABLE_HEIGHT - 82 - startY) / dirY);
  }

  if (dirY < 0) {
    maxDistance = Math.min(maxDistance, (82 - startY) / dirY);
  }

  const ballsToCheck = [
    !blackBallPotted ? blackBall : null,
    !solidBallPotted ? solidBall : null,
    !stripeBallPotted ? stripeBall : null,
  ].filter(Boolean) as { x: number; y: number }[];

  for (const target of ballsToCheck) {
    const toBallX = target.x - startX;
    const toBallY = target.y - startY;

    const projection = toBallX * dirX + toBallY * dirY;

    if (projection <= 0) continue;

    const closestX = startX + dirX * projection;
    const closestY = startY + dirY * projection;

    const dx = target.x - closestX;
    const dy = target.y - closestY;
    const distanceToLine = Math.sqrt(dx * dx + dy * dy);

    if (distanceToLine <= BALL_RADIUS * 2) {
      maxDistance = Math.min(maxDistance, projection - BALL_RADIUS);
    }
  }

  return Math.max(40, maxDistance);
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
  const solidBallXPercent = (solidBall.x / TABLE_WIDTH) * 100;
const solidBallYPercent = (solidBall.y / TABLE_HEIGHT) * 100;

const stripeBallXPercent = (stripeBall.x / TABLE_WIDTH) * 100;
const stripeBallYPercent = (stripeBall.y / TABLE_HEIGHT) * 100;
return (
  <main className="flex min-h-screen items-center justify-center bg-[#07140f] p-8">
   <div className="relative aspect-[2/1] w-[96vw] max-w-[1800px] overflow-hidden rounded-[28px] shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
      <img
        src="/pool/table-bg.jpg"
        alt=""
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-fill"
      />
<button
  type="button"
  onClick={() => {
    window.location.href = "/pool/tv";
  }}
  className="absolute right-6 top-6 z-20 rounded-2xl bg-white/90 px-6 py-4 text-xl font-black text-[#07140f] shadow-lg hover:bg-white"
>
  New Game
</button>
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

{!isMoving && (
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