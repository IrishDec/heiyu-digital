"use client";

import { useEffect, useState } from "react";
import { poolSocket } from "@/lib/pool/socket";

export default function PoolTvPage() {
  const [pin, setPin] = useState("----");
  const [status, setStatus] = useState("Creating TV room...");

  useEffect(() => {
    poolSocket.emit("tv:create-room");

    poolSocket.on("tv:room-created", ({ pin }) => {
      setPin(pin);
      setStatus("Waiting for phone controller...");
    });

   poolSocket.on("tv:controller-connected", () => {
  setStatus("Phone connected. Loading game...");

  setTimeout(() => {
    window.location.href = `/pool/game?pin=${pin}`;
  }, 1200);
});

    poolSocket.on("tv:controller-disconnected", () => {
      setStatus("Phone disconnected.");
    });

    return () => {
      poolSocket.off("tv:room-created");
      poolSocket.off("tv:controller-connected");
      poolSocket.off("tv:controller-disconnected");
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#07140f] text-white">
      <section className="flex min-h-screen items-center justify-center px-8">
        <div className="aspect-video w-full max-w-7xl rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#10241b] to-[#07140f] p-12">
          <div className="flex h-full flex-col items-center justify-center text-center">
            <p className="mb-4 text-xl font-bold uppercase tracking-[0.35em] text-emerald-400">
              Heiyu Pool
            </p>

            <h1 className="text-6xl font-black sm:text-8xl">
              Pair Your Phone
            </h1>

            <div className="mt-12 flex gap-6">
              {pin.split("").map((digit, index) => (
                <div
                  key={index}
                  className="flex h-40 w-32 items-center justify-center rounded-3xl bg-white text-8xl font-black text-[#07140f]"
                >
                  {digit}
                </div>
              ))}
            </div>

            <p className="mt-10 text-3xl font-bold text-white/80">
              {status}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}