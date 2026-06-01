"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { poolSocket } from "@/lib/pool/socket";

export default function PoolGamePage() {
  const searchParams = useSearchParams();
  const pin = searchParams.get("pin");

  const [aim, setAim] = useState(0);
  const [power, setPower] = useState(50);
  const [ballX, setBallX] = useState(50);
  const [ballY, setBallY] = useState(50);
  const [isMoving, setIsMoving] = useState(false);

  const velocityRef = useRef({ x: 0, y: 0 });
  const ballRef = useRef({ x: 50, y: 50 });
  const aimRef = useRef(0);
  const powerRef = useRef(50);

  useEffect(() => {
    if (pin) {
      poolSocket.emit("tv:join-room", { pin });
    }

    function aimLeft() {
      aimRef.current -= 5;
      setAim(aimRef.current);
    }

    function aimRight() {
      aimRef.current += 5;
      setAim(aimRef.current);
    }

    function updatePower(data: { power: number }) {
      powerRef.current = data.power;
      setPower(data.power);
    }

    function shoot() {
      const moving =
        Math.abs(velocityRef.current.x) > 0 ||
        Math.abs(velocityRef.current.y) > 0;

      if (moving) return;

      const radians = (aimRef.current * Math.PI) / 180;
      const speed = Math.max(0.8, powerRef.current * 0.035);

      velocityRef.current = {
        x: Math.cos(radians) * speed,
        y: Math.sin(radians) * speed,
      };

      setIsMoving(true);
    }

    poolSocket.on("game:aim-left", aimLeft);
    poolSocket.on("game:aim-right", aimRight);
    poolSocket.on("game:power", updatePower);
    poolSocket.on("game:shoot", shoot);

    return () => {
      poolSocket.off("game:aim-left", aimLeft);
      poolSocket.off("game:aim-right", aimRight);
      poolSocket.off("game:power", updatePower);
      poolSocket.off("game:shoot", shoot);
    };
  }, [pin]);

  useEffect(() => {
    const timer = setInterval(() => {
      let nextX = ballRef.current.x + velocityRef.current.x;
      let nextY = ballRef.current.y + velocityRef.current.y;

      if (nextX <= 3 || nextX >= 97) {
        velocityRef.current.x *= -0.65;
        nextX = Math.max(3, Math.min(97, nextX));
      }

      if (nextY <= 5 || nextY >= 95) {
        velocityRef.current.y *= -0.65;
        nextY = Math.max(5, Math.min(95, nextY));
      }

      velocityRef.current.x *= 0.96;
      velocityRef.current.y *= 0.96;

      if (Math.abs(velocityRef.current.x) < 0.03) velocityRef.current.x = 0;
      if (Math.abs(velocityRef.current.y) < 0.03) velocityRef.current.y = 0;

      ballRef.current = {
        x: nextX,
        y: nextY,
      };

      setBallX(nextX);
      setBallY(nextY);

      const stillMoving =
        Math.abs(velocityRef.current.x) > 0 ||
        Math.abs(velocityRef.current.y) > 0;

      setIsMoving(stillMoving);
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

          <div className="mt-2 text-xs text-white/60">
            {isMoving ? "Ball moving" : "Ready"}
          </div>
        </div>

        {!isMoving && (
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
        )}

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