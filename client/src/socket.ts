import { io } from "socket.io-client";

export const socket = io(
  process.env.NODE_ENV === "production"
    ? "https://tictactoe-multiplayer-production-a919.up.railway.app/"
    : "http://localhost:8000"
);
