"use client";

import { useEffect, useRef, useState } from "react";

type ControlState = {
  aim: number;
  power: number;
  lastAction: string;
  shotId: number;
  updatedAt: string;
};

export default function PoolGamePage() {
  const [aim, setAim] = useState(0);
  const [power, setPower] = useState(50);
  const [ballX, setBallX] = useState(50);
  const [ballY, setBallY] = useState(50);

  const velocityRef = useRef({ x: 0, y: 0 });
  const lastShotRef = useRef(0);

  useEffect(() => {
    const poll = setInterval(async () => {
      try {
        const res = await fetch("/api/pool/control", { cache: "no-store" });
        const data = await res.json();
        const control: ControlState = data.control;

        setAim(control.aim);
        setPower(control.power);

    if (
  control.lastAction === "shoot" &&
  control.shotId !== lastShotRef.current
) {
  lastShotRef.current = control.shotId;

          const radians = (control.aim * Math.PI) / 180;
          const speed = Math.max(1.2, control.power * 0.05);

          velocityRef.current = {
            x: Math.cos(radians) * speed,
            y: Math.sin(radians) * speed,
          };
        }
      } catch {}
    }, 200);

    return () => clearInterval(poll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setBallX((prev) => {
        const next = prev + velocityRef.current.x;

        if (next <= 3 || next >= 97) {
          velocityRef.current.x *= -0.7;
          return Math.max(3, Math.min(97, next));
        }

        return next;
      });

      setBallY((prev) => {
        const next = prev + velocityRef.current.y;

        if (next <= 5 || next >= 95) {
          velocityRef.current.y *= -0.7;
          return Math.max(5, Math.min(95, next));
        }

        return next;
      });

      velocityRef.current.x *= 0.975;
      velocityRef.current.y *= 0.975;

      if (Math.abs(velocityRef.current.x) < 0.02) velocityRef.current.x = 0;
      if (Math.abs(velocityRef.current.y) < 0.02) velocityRef.current.y = 0;
    }, 16);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#07140f] p-8">
      <div className="relative aspect-video w-full max-w-7xl overflow-hidden rounded-[32px] border-8 border-[#4a2c12] bg-[#0b6b3a] shadow-2xl">
        <div className="absolute left-6 top-6 rounded-xl bg-black/30 px-4 py-3 text-white">
          <div className="text-xs uppercase text-white/60">Aim</div>
          <div className="text-3xl font-black">{aim}°</div>
          <div className="mt-2 text-xs uppercase text-white/60">Power</div>
          <div className="text-2xl font-black">{power}%</div>
        </div>

        <div
          className="absolute origin-left rounded-full bg-white"
          style={{
            left: `${ballX}%`,
            top: `${ballY}%`,
            width: "220px",
            height: "4px",
            transform: `translateY(-50%) rotate(${aim}deg)`,
          }}
        />

        <div
          className="absolute h-10 w-10 rounded-full bg-white shadow-lg"
          style={{
            left: `${ballX}%`,
            top: `${ballY}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    </main>
  );
}