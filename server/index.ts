import express from "express";
import http from "http";
import { Server } from "socket.io";
import { createGame, joinGame } from "./gameManager";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const PORT = 8000;

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("create-game", () => {
    console.log("create-game-event");
    const { gameId, playerSymbol, players } = createGame(socket.id);
    socket.join(gameId);
    socket.emit("game-created", { gameId, playerSymbol, players });
    console.log(`Player ${playerSymbol} joined game ${gameId}`);
  });

  socket.on("join-game", (gameId: string) => {
    const game = joinGame(gameId, socket.id);
    if (!game) {
      socket.emit("game-not-found");
      return;
    }
    socket.join(gameId);
    socket.emit("game-joined", game);
    console.log("game", game);
    io.to(gameId).emit("player-joined", game);
    console.log(`Player ${game.playerSymbol} joined game ${gameId}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
