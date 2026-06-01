const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    ok: true,
    service: "Heiyu Pool Socket Server",
  });
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const rooms = new Map();

function createPin() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

function cleanPin(pin) {
  return String(pin || "").replace(/\D/g, "").slice(0, 4);
}

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("tv:create-room", () => {
    let pin = createPin();

    while (rooms.has(pin)) {
      pin = createPin();
    }

    const room = {
      pin,
      tvSocketId: socket.id,
      controllerSocketId: null,
    };

    rooms.set(pin, room);
    socket.join(pin);

    socket.emit("tv:room-created", { pin });

    console.log("TV room created:", pin);
  });

  socket.on("tv:join-room", ({ pin }) => {
    const roomPin = cleanPin(pin);
    const room = rooms.get(roomPin);

    if (!room) {
      socket.emit("tv:error", { message: "Room not found" });
      return;
    }

    room.tvSocketId = socket.id;
    socket.join(roomPin);

    socket.emit("tv:joined-room", { pin: roomPin });

    console.log("TV joined existing game room:", roomPin);
  });

  socket.on("controller:join-room", ({ pin }) => {
    const roomPin = cleanPin(pin);
    const room = rooms.get(roomPin);

    if (!room) {
      socket.emit("controller:error", { message: "Room not found" });
      return;
    }

    room.controllerSocketId = socket.id;
    socket.join(roomPin);

    io.to(roomPin).emit("tv:controller-connected");

    socket.emit("controller:joined", { pin: roomPin });

    console.log("Controller joined:", roomPin);
  });

  socket.on("controller:aim-left", ({ pin }) => {
    const roomPin = cleanPin(pin);
    console.log("AIM LEFT", roomPin);
    io.to(roomPin).emit("game:aim-left");
  });

  socket.on("controller:aim-right", ({ pin }) => {
    const roomPin = cleanPin(pin);
    console.log("AIM RIGHT", roomPin);
    io.to(roomPin).emit("game:aim-right");
  });

  socket.on("controller:power", ({ pin, power }) => {
    const roomPin = cleanPin(pin);
    console.log("POWER", roomPin, power);
    io.to(roomPin).emit("game:power", { power });
  });

  socket.on("controller:shoot", ({ pin }) => {
    const roomPin = cleanPin(pin);
    console.log("SHOOT", roomPin);
    io.to(roomPin).emit("game:shoot");
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);

    for (const [pin, room] of rooms.entries()) {
      if (room.tvSocketId === socket.id) {
        rooms.delete(pin);
        io.to(pin).emit("room:closed");
      }

      if (room.controllerSocketId === socket.id) {
        room.controllerSocketId = null;
        io.to(pin).emit("tv:controller-disconnected");
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`Heiyu Pool Socket Server running on port ${PORT}`);
});