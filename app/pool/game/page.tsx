"use client";

import { useEffect, useState } from "react";

type ControlState = {
  aim: number;
  power: number;
  lastAction: string;
};

export default function PoolGamePage() {
  const [aim, setAim] = useState(0);

  useEffect(() => {
    const poll = setInterval(async () => {
      try {
        const res = await fetch("/api/pool/control");

        const data = await res.json();

        const control: ControlState = data.control;

        setAim(control.aim);
      } catch {
        // ignore
      }
    }, 250);

    return () => clearInterval(poll);
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#07140f] p-8">
      <div className="relative aspect-video w-full max-w-7xl overflow-hidden rounded-[32px] border-8 border-[#4a2c12] bg-[#0b6b3a] shadow-2xl">

        {/* Cue Ball */}
        <div
          className="absolute h-10 w-10 rounded-full bg-white shadow-lg"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Aim Line */}
        <div
          className="absolute left-1/2 top-1/2 origin-left"
          style={{
            width: "220px",
            height: "4px",
            background: "white",
            transform: `translateY(-50%) rotate(${aim}deg)`,
          }}
        />

        {/* Debug Panel */}
        <div className="absolute left-6 top-6 rounded-xl bg-black/30 px-4 py-3 text-white">
          <div className="text-xs uppercase text-white/60">
            Aim
          </div>
          <div className="text-3xl font-black">
            {aim}°
          </div>
        </div>
      </div>
    </main>
  );
}