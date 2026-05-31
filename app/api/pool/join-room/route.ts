export const dynamic = "force-dynamic";

type PoolRoom = {
  pin: string;
  roomId: string;
  paired: boolean;
  createdAt: string;
};

declare global {
  var poolRooms: Map<string, PoolRoom> | undefined;
}

function getRooms() {
  if (!globalThis.poolRooms) {
    globalThis.poolRooms = new Map<string, PoolRoom>();
  }

  return globalThis.poolRooms;
}

export async function POST(request: Request) {
  const rooms = getRooms();

  const body = await request.json().catch(() => null);

  const pin = String(body?.pin || "")
    .replace(/\D/g, "")
    .slice(0, 4);

  if (pin.length !== 4) {
    return Response.json(
      {
        ok: false,
        message: "Enter a valid 4-digit PIN.",
      },
      { status: 400 }
    );
  }

  const room = rooms.get(pin);

  if (!room) {
    return Response.json(
      {
        ok: false,
        message: "Room not found.",
      },
      { status: 404 }
    );
  }

  room.paired = true;

  rooms.set(pin, room);

  return Response.json({
    ok: true,
    pin,
    roomId: room.roomId,
    message: "Phone paired.",
  });
}