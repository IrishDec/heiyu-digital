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

  socket.on("controller:join-room", ({ pin }) => {
    const cleanPin = String(pin || "").replace(/\D/g, "").slice(0, 4);
    const room = rooms.get(cleanPin);

    if (!room) {
      socket.emit("controller:error", {
        message: "Room not found",
      });
      return;
    }

    room.controllerSocketId = socket.id;
    socket.join(cleanPin);

    io.to(room.tvSocketId).emit("tv:controller-connected");

    socket.emit("controller:joined", {
      pin: cleanPin,
    });

    console.log("Controller joined:", cleanPin);
  });

  socket.on("controller:aim-left", ({ pin }) => {
    io.to(pin).emit("game:aim-left");
  });

  socket.on("controller:aim-right", ({ pin }) => {
    io.to(pin).emit("game:aim-right");
  });

  socket.on("controller:power", ({ pin, power }) => {
    io.to(pin).emit("game:power", { power });
  });

  socket.on("controller:shoot", ({ pin }) => {
    io.to(pin).emit("game:shoot");
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
        io.to(room.tvSocketId).emit("tv:controller-disconnected");
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`Heiyu Pool Socket Server running on port ${PORT}`);
});server.js