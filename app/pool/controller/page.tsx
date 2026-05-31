"use client";

import { useState } from "react";

export default function PoolControllerPage() {
  const [pin, setPin] = useState("");
  const [status, setStatus] = useState("Enter the 4-digit PIN shown on the TV.");
  const [paired, setPaired] = useState(false);
  const [power, setPower] = useState(50);

  async function joinRoom() {
    setStatus("Joining room...");

    try {
      const res = await fetch("/api/pool/join-room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pin }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setStatus(data.message || "Could not join room.");
        return;
      }

      setPaired(true);
      setStatus("Connected");
    } catch {
      setStatus("Connection failed.");
    }
  }

  async function sendControl(action: string, value?: number) {
    await fetch("/api/pool/control", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        action === "set-power"
          ? { action, power: value }
          : { action }
      ),
    });
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

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => sendControl("aim-left")}
              className="rounded-2xl bg-white/10 p-8 text-xl font-bold active:bg-emerald-400 active:text-[#07140f]"
            >
              ◀ Aim Left
            </button>

            <button
              type="button"
              onClick={() => sendControl("aim-right")}
              className="rounded-2xl bg-white/10 p-8 text-xl font-bold active:bg-emerald-400 active:text-[#07140f]"
            >
              Aim Right ▶
            </button>
          </div>

          <div className="mt-6 rounded-2xl bg-white/10 p-5">
            <label className="mb-3 block text-sm font-bold text-white/70">
              Shot Power: {power}%
            </label>

            <input
              type="range"
              min="0"
              max="100"
              value={power}
              onChange={(event) => {
                const nextPower = Number(event.target.value);
                setPower(nextPower);
                sendControl("set-power", nextPower);
              }}
              className="w-full"
            />
          </div>

          <button
            type="button"
            onClick={() => sendControl("shoot")}
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