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

  function sendAimLeft() {
    poolSocket.emit("controller:aim-left", { pin });
  }

  function sendAimRight() {
    poolSocket.emit("controller:aim-right", { pin });
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
      <main className="min-h-screen bg-[#07140f] p-5 text-white">
        <div className="mx-auto max-w-md">
          <p className="mb-2 text-center text-sm font-bold uppercase tracking-[0.25em] text-emerald-400">
            Heiyu Pool
          </p>

          <h1 className="mb-8 text-center text-3xl font-black">
            Cue Controller
          </h1>

         <div
  onPointerDown={handleAimTouch}
  onPointerMove={(event) => {
    if (event.buttons === 1) {
      handleAimTouch(event);
    }
  }}
  className="relative mx-auto flex h-64 w-64 touch-none items-center justify-center rounded-full border border-white/15 bg-white/10"
>
  <div className="absolute h-3 w-3 rounded-full bg-emerald-400" />

  <div
    className="absolute left-1/2 top-1/2 h-1 w-24 origin-left rounded-full bg-emerald-400"
    style={{
      transform: `translateY(-50%) rotate(${aim}deg)`,
    }}
  />

  <p className="absolute bottom-6 text-sm font-bold text-white/60">
    Drag to aim
  </p>
</div>

          <div className="mt-6 rounded-2xl bg-white/10 p-5">
            <label className="mb-3 block text-sm font-bold text-white/70">
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
            className="mt-8 w-full rounded-2xl bg-emerald-400 py-6 text-2xl font-black text-[#07140f] active:bg-emerald-300"
          >
            SHOOT
          </button>

          <p className="mt-5 text-center text-sm text-white/50">
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