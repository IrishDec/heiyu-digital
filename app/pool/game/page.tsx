"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { io } from "socket.io-client";

const SOCKET_URL = "https://heiyu-pool-server.onrender.com";

const TABLE_WIDTH = 1000;
const TABLE_HEIGHT = 560;
const BALL_RADIUS = 16;

export default function PoolGamePage() {
  const [aim, setAim] = useState(0);
  const [power, setPower] = useState(50);
  const [ball, setBall] = useState({ x: TABLE_WIDTH / 2, y: TABLE_HEIGHT / 2 });
  const [blackBall, setBlackBall] = useState({
  x: TABLE_WIDTH / 2 + 220,
  y: TABLE_HEIGHT / 2,
});
  const [isMoving, setIsMoving] = useState(false);
  const [roomPin, setRoomPin] = useState("----");

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

    const topWall = Matter.Bodies.rectangle(TABLE_WIDTH / 2, 0, TABLE_WIDTH, 24, wallOptions);
    const bottomWall = Matter.Bodies.rectangle(TABLE_WIDTH / 2, TABLE_HEIGHT, TABLE_WIDTH, 24, wallOptions);
    const leftWall = Matter.Bodies.rectangle(0, TABLE_HEIGHT / 2, 24, TABLE_HEIGHT, wallOptions);
    const rightWall = Matter.Bodies.rectangle(TABLE_WIDTH, TABLE_HEIGHT / 2, 24, TABLE_HEIGHT, wallOptions);

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

      Matter.Body.applyForce(cueBall, cueBall.position, {
x: -Math.cos(radians) * force,
y: -Math.sin(radians) * force,
      });
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

    if (blackBall) {
      setBlackBall({
        x: blackBall.position.x,
        y: blackBall.position.y,
      });
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
      <div className="relative aspect-[1000/560] w-full max-w-7xl overflow-hidden rounded-[32px] border-8 border-[#4a2c12] bg-[#0b6b3a] shadow-2xl">
      {/* Pockets */}
<div className="absolute left-3 top-3 h-14 w-14 rounded-full bg-black shadow-inner" />
<div className="absolute left-1/2 top-2 h-14 w-14 -translate-x-1/2 rounded-full bg-black shadow-inner" />
<div className="absolute right-3 top-3 h-14 w-14 rounded-full bg-black shadow-inner" />

<div className="absolute bottom-3 left-3 h-14 w-14 rounded-full bg-black shadow-inner" />
<div className="absolute bottom-2 left-1/2 h-14 w-14 -translate-x-1/2 rounded-full bg-black shadow-inner" />
<div className="absolute bottom-3 right-3 h-14 w-14 rounded-full bg-black shadow-inner" />
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
          <div
            className="absolute origin-left rounded-full bg-white"
            style={{
              left: `${ballXPercent}%`,
              top: `${ballYPercent}%`,
              width: "220px",
              height: "4px",
              transform: `translateY(-50%) rotate(${aim}deg)`,
            }}
          />
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
      </div>


    </main>
  );
}