"use client";

import { useEffect, useState } from "react";

export default function PoolTvPage() {
  const [pin, setPin] = useState("----");
  const [status, setStatus] = useState("Creating TV room...");

  useEffect(() => {
    let interval: NodeJS.Timeout;

    async function createRoom() {
      const res = await fetch("/api/pool/create-room", {
        method: "POST",
      });

      const data = await res.json();

      setPin(data.pin);
      setStatus("Waiting for phone controller...");

      interval = setInterval(async () => {
        const roomRes = await fetch(
          `/api/pool/room-status?pin=${data.pin}`
        );

        const roomData = await roomRes.json();

        if (roomData.paired) {
          setStatus("Phone connected. Ready to play.");
          clearInterval(interval);
        }
      }, 2000);
    }

    createRoom();

    return () => {
      if (interval) clearInterval(interval);
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