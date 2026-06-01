export const dynamic = "force-dynamic";

type PoolControlState = {
  aim: number;
  power: number;
  shootQueued: boolean;
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
      shootQueued: false,
      shotId: 0,
      updatedAt: new Date().toISOString(),
    };
  }

  return globalThis.poolControlState;
}

export async function GET() {
  const control = getControlState();

  const response = {
    ok: true,
    control: { ...control },
  };

  if (control.shootQueued) {
    control.shootQueued = false;
  }

  return Response.json(response);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const action = String(body?.action || "");
  const power = Number(body?.power);

  const control = getControlState();

  if (action === "aim-left") {
    control.aim -= 5;
  }

  if (action === "aim-right") {
    control.aim += 5;
  }

  if (action === "set-power" && Number.isFinite(power)) {
    control.power = Math.max(0, Math.min(100, power));
  }

  if (action === "shoot") {
    control.shootQueued = true;
    control.shotId += 1;
  }

  control.updatedAt = new Date().toISOString();

  return Response.json({
    ok: true,
    control,
  });
}