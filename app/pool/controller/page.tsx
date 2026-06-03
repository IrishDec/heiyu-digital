"use client";

import { useState } from "react";
import { poolSocket } from "@/lib/pool/socket";

export default function PoolControllerPage() {
  const [pin, setPin] = useState("");
  const [status, setStatus] = useState("Enter the 4-digit PIN shown on the TV.");
  const [paired, setPaired] = useState(false);
  const [power, setPower] = useState(80);
  const [aim, setAim] = useState(0);

  function joinRoom() {
    const cleanPin = pin.replace(/\D/g, "").slice(0, 4);

    if (cleanPin.length !== 4) {
      setStatus("Enter a valid 4-digit PIN.");
      return;
    }

    setStatus("Joining room...");

    poolSocket.emit("controller:join-room", {
      pin: cleanPin,
    });

    poolSocket.once("controller:joined", () => {
      setPaired(true);
      setStatus("Connected");
    });

    poolSocket.once("controller:error", (data) => {
      setStatus(data?.message || "Could not join room.");
    });
  }

  function handleAimTouch(event: React.PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = event.clientX - centerX;
    const y = event.clientY - centerY;

    const angle = Math.round((Math.atan2(y, x) * 180) / Math.PI);

    setAim(angle);

    poolSocket.emit("controller:aim-angle", {
      pin,
      aim: angle,
    });
  }

  function nudgeAim(direction: "left" | "right") {
    const step = 1;
    const nextAim = direction === "left" ? aim - step : aim + step;

    setAim(nextAim);

    poolSocket.emit("controller:aim-angle", {
      pin,
      aim: nextAim,
    });
  }

  function sendPower(nextPower: number) {
    setPower(nextPower);

    poolSocket.emit("controller:power", {
      pin,
      power: nextPower,
    });
  }

  function sendShoot() {
    poolSocket.emit("controller:shoot", { pin });
  }

  if (paired) {
    return (
      <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_center,#123027_0%,#07140f_58%,#04100c_100%)] px-5 py-6 text-white">
        <div className="mx-auto flex min-h-[92vh] max-w-md flex-col items-center justify-start">
          <p className="text-center text-sm font-black uppercase tracking-[0.35em] text-emerald-400">
            Heiyu Pool
          </p>

          <h1 className="mt-3 text-center text-4xl font-black tracking-tight">
            Cue Controller
          </h1>

          <div className="relative mt-8 h-[330px] w-full">
            <button
              type="button"
              onClick={() => nudgeAim("left")}
              className="absolute bottom-0 left-0 z-10 flex h-[135px] w-[145px] items-end justify-center pb-8 border border-white/25 bg-white/[0.06] text-5xl font-black text-white/95 shadow-[0_20px_45px_rgba(0,0,0,0.35)] active:bg-emerald-400 active:text-[#07140f]"
              style={{
                clipPath:
                  "polygon(0 96%, 0 54%, 12% 42%, 21% 22%, 31% 0, 43% 0, 58% 33%, 100% 93%, 100% 100%, 0 100%)",
                borderRadius: "28px",
              }}
            >
              <span className="translate-x-[-18px] translate-y-[12px]">◀</span>
            </button>

            <button
              type="button"
              onClick={() => nudgeAim("right")}
              className="absolute bottom-0 right-0 z-10 flex h-[135px] w-[145px] items-end justify-center pb-8 border border-white/25 bg-white/[0.06] text-5xl font-black text-white/95 shadow-[0_20px_45px_rgba(0,0,0,0.35)] active:bg-emerald-400 active:text-[#07140f]"
              style={{
                clipPath:
                  "polygon(100% 96%, 100% 54%, 88% 42%, 79% 22%, 69% 0, 57% 0, 42% 33%, 0 93%, 0 100%, 100% 100%)",
                borderRadius: "28px",
              }}
            >
              <span className="translate-x-[18px] translate-y-[12px]">▶</span>
            </button>

            <div
              onPointerDown={handleAimTouch}
              onPointerMove={(event) => {
                if (event.buttons === 1) {
                  handleAimTouch(event);
                }
              }}
              className="absolute left-1/2 top-0 z-20 flex h-[280px] w-[280px] -translate-x-1/2 touch-none items-center justify-center rounded-full border border-white/25 bg-white/[0.09] shadow-[inset_0_0_45px_rgba(255,255,255,0.04),0_25px_70px_rgba(0,0,0,0.45)]"
            >
              <div className="absolute h-4 w-4 rounded-full bg-emerald-400" />

              <div
                className="absolute left-1/2 top-1/2 h-2 w-28 origin-left rounded-full bg-emerald-400"
                style={{
                  transform: `translateY(-50%) rotate(${aim}deg)`,
                }}
              />

              <div className="absolute bottom-12 text-center">
                <p className="text-lg font-black text-white/75">
                  Drag to aim
                </p>
                <p className="mt-1 text-sm font-bold text-emerald-300">
                  Tap arrows to fine aim
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 w-full rounded-[28px] bg-white/[0.09] p-6 shadow-[0_20px_55px_rgba(0,0,0,0.35)]">
            <label className="mb-5 block text-xl font-black text-white/80">
              Shot Power: {power}%
            </label>

            <input
              type="range"
              min="0"
              max="90"
              value={power}
              onChange={(event) => sendPower(Number(event.target.value))}
              className="w-full"
            />
          </div>

          <button
            type="button"
            onClick={sendShoot}
            className="mt-8 w-full rounded-[28px] bg-emerald-400 py-7 text-4xl font-black text-[#07140f] shadow-[0_20px_55px_rgba(16,185,129,0.25)] active:scale-[0.98] active:bg-emerald-300"
          >
            SHOOT
          </button>

          <p className="mt-8 text-center text-xl text-white/45">
            Connected to room {pin}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#07140f] px-5 py-8 text-white">
      <section className="mx-auto flex min-h-[85vh] max-w-md flex-col justify-center">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-emerald-400">
          Heiyu Pool
        </p>

        <h1 className="text-4xl font-black">Phone Controller</h1>

        <p className="mt-4 text-white/65">{status}</p>

        <div className="mt-8 space-y-4">
          <input
            value={pin}
            onChange={(event) =>
              setPin(event.target.value.replace(/\D/g, "").slice(0, 4))
            }
            type="text"
            inputMode="numeric"
            maxLength={4}
            placeholder="1234"
            className="w-full rounded-2xl bg-white px-5 py-5 text-center text-5xl font-black tracking-[0.25em] text-[#07140f]"
          />

          <button
            type="button"
            onClick={joinRoom}
            className="w-full rounded-2xl bg-emerald-400 px-6 py-5 text-lg font-black text-[#07140f]"
          >
            Join TV Room
          </button>
        </div>
      </section>
    </main>
  );
}