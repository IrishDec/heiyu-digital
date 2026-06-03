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