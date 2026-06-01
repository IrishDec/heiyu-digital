import { io } from "socket.io-client";

export const poolSocket = io("https://heiyu-pool-server.onrender.com", {
  transports: ["websocket"],
});