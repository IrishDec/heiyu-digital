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

function createPin() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

export async function POST() {
  const rooms = getRooms();

  let pin = createPin();

  while (rooms.has(pin)) {
    pin = createPin();
  }

  const room: PoolRoom = {
    pin,
    roomId: `pool-${pin}`,
    paired: false,
    createdAt: new Date().toISOString(),
  };

  rooms.set(pin, room);

  return Response.json({
    ok: true,
    ...room,
  });
}