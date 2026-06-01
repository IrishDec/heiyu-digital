export const dynamic = "force-dynamic";

type PoolControlState = {
  aim: number;
  power: number;
  lastAction: string;
  shotId: number;
  updatedAt: string;
};

declare global {
  var poolControlState: PoolControlState | undefined;
}

function getControlState() {
  if (!globalThis.poolControlState) {
    globalThis.poolControlState = {
      aim: 0,
      power: 50,
      lastAction: "none",
      shotId: 0,
      updatedAt: new Date().toISOString(),
    };
  }

  return globalThis.poolControlState;
}

export async function GET() {
  return Response.json({
    ok: true,
    control: getControlState(),
  });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const action = String(body?.action || "");
  const power = Number(body?.power);

  const control = getControlState();

  if (action === "aim-left") {
    control.aim -= 5;
    control.lastAction = "aim-left";
  }

  if (action === "aim-right") {
    control.aim += 5;
    control.lastAction = "aim-right";
  }

  if (action === "set-power" && Number.isFinite(power)) {
    control.power = Math.max(0, Math.min(100, power));
    control.lastAction = "set-power";
  }

  if (action === "shoot") {
    control.shotId += 1;
    control.lastAction = "shoot";
  }

  control.updatedAt = new Date().toISOString();

  return Response.json({
    ok: true,
    control,
  });
}