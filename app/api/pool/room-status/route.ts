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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const pin = searchParams.get("pin") || "";

  const room = getRooms().get(pin);

  if (!room) {
    return Response.json(
      {
        ok: false,
        message: "Room not found",
      },
      { status: 404 }
    );
  }

  return Response.json({
    ok: true,
    pin: room.pin,
    paired: room.paired,
    roomId: room.roomId,
  });
}