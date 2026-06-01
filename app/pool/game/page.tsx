"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { io } from "socket.io-client";

const SOCKET_URL = "https://heiyu-pool-server.onrender.com";

const TABLE_WIDTH = 1000;
const TABLE_HEIGHT = 560;
const BALL_RADIUS = 16;

const POCKET_RADIUS = 48;

const POCKETS = [
  { x: 92, y: 86 },
  { x: TABLE_WIDTH / 2, y: 78 },
  { x: TABLE_WIDTH - 92, y: 86 },
  { x: 92, y: TABLE_HEIGHT - 86 },
  { x: TABLE_WIDTH / 2, y: TABLE_HEIGHT - 78 },
  { x: TABLE_WIDTH - 92, y: TABLE_HEIGHT - 86 },
];

export default function PoolGamePage() {
  const [aim, setAim] = useState(0);
  const [power, setPower] = useState(50);
  const [ball, setBall] = useState({ x: TABLE_WIDTH / 2, y: TABLE_HEIGHT / 2 });
  const [blackBall, setBlackBall] = useState({
  x: TABLE_WIDTH / 2 + 220,
  y: TABLE_HEIGHT / 2,
});
  const [isMoving, setIsMoving] = useState(false);
  const [blackBallPotted, setBlackBallPotted] = useState(false);
  const [blackBallSinking, setBlackBallSinking] = useState(false);
  const [roomPin, setRoomPin] = useState("----");
  const [cueStriking, setCueStriking] = useState(false);

  const engineRef = useRef<Matter.Engine | null>(null);
  const cueBallRef = useRef<Matter.Body | null>(null);
  const blackBallRef = useRef<Matter.Body | null>(null);
  const aimRef = useRef(0);
  const powerRef = useRef(50);

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

    const cueBall = Matter.Bodies.circle(TABLE_WIDTH / 2, TABLE_HEIGHT / 2, BALL_RADIUS, {
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

blackBallRef.current = blackBall;

    cueBallRef.current = cueBall;

Matter.World.add(engine.world, [
  topWall,
  bottomWall,
  leftWall,
  rightWall,
  cueBall,
  blackBall,
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
      const force = Math.max(0.025, powerRef.current * 0.0012);

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

 if (blackBall && !blackBallPotted && !blackBallSinking) {
  const pocket = POCKETS.find((pocket) => {
    const dx = blackBall.position.x - pocket.x;
    const dy = blackBall.position.y - pocket.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance < POCKET_RADIUS;
  });

  if (pocket) {
    setBlackBallSinking(true);

    Matter.Body.setVelocity(blackBall, { x: 0, y: 0 });
    Matter.Body.setAngularVelocity(blackBall, 0);
    Matter.Body.setPosition(blackBall, pocket);

    setBlackBall({ x: pocket.x, y: pocket.y });

    setTimeout(() => {
      const engine = engineRef.current;

      if (engine) {
        Matter.World.remove(engine.world, blackBall);
      }

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
  }, 1000 / 60);

  return () => clearInterval(frame);
}, []);

  const ballXPercent = (ball.x / TABLE_WIDTH) * 100;
  const ballYPercent = (ball.y / TABLE_HEIGHT) * 100;
  const blackBallXPercent = (blackBall.x / TABLE_WIDTH) * 100;
  const blackBallYPercent = (blackBall.y / TABLE_HEIGHT) * 100;
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
  <>
    {/* Aim guide */}
    <div
      className="absolute z-30 origin-left border-t-2 border-dashed border-white/70"
      style={{
        left: `${ballXPercent}%`,
        top: `${ballYPercent}%`,
        width: "360px",
        transform: `translateY(-50%) rotate(${aim}deg)`,
      }}
    />

    {/* Cue stick: same math as old white line, offset behind ball */}
    <div
      className="absolute z-30 origin-left rounded-full bg-gradient-to-r from-[#3b1d0b] via-[#c28a4a] to-[#f3d6a2] shadow-lg"
      style={{
        left: `${ballXPercent}%`,
        top: `${ballYPercent}%`,
        width: "300px",
        height: "10px",
        transform: `translateY(-50%) rotate(${aim + 180}deg) translateX(26px)`,
      }}
    />
  </>
)}

        <div
          className="absolute rounded-full bg-white shadow-lg"
          style={{
            left: `${ballXPercent}%`,
            top: `${ballYPercent}%`,
            width: `${BALL_RADIUS * 2}px`,
            height: `${BALL_RADIUS * 2}px`,
            transform: "translate(-50%, -50%)",
          }}
        />
      {!blackBallPotted && (
  <div
    className="absolute rounded-full bg-black shadow-lg ring-2 ring-white/20"
    style={{
      left: `${blackBallXPercent}%`,
      top: `${blackBallYPercent}%`,
      width: `${BALL_RADIUS * 2}px`,
      height: `${BALL_RADIUS * 2}px`,
      transform: "translate(-50%, -50%)",
    }}
  />
)}
      </div>


    </main>
  );
}