import express from "express";
import http from "http";
import { Server } from "socket.io";
import {
  createGame,
  deleteGame,
  getGameByPlayerSocketId,
  joinGame,
  makeMove,
} from "./gameManager";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const PORT = 8000;

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("create-game", () => {
    console.log("create-game-event");
    const game = createGame(socket.id);
    console.log("game", game);
    if (!game.gameId) {
      socket.emit("error-message", "Could not create game");
      return;
    }
    socket.join(game.gameId);
    socket.emit("game-created", game);
    console.log(`Player X joined game ${game.gameId}`);
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
    console.log(`Player O joined game ${gameId}`);
  });

  socket.on("make-move", (gameId: string, index: number) => {
    const result = makeMove(gameId, socket.id, index);
    console.log("result", result);
    if (result.error) {
      socket.emit("error-message", result.error);
    } else {
      io.to(gameId).emit("game-updated", result);
    }
  });

  socket.on("disconnect", () => {
    const match = getGameByPlayerSocketId(socket.id);
    console.log("game in disconnect:", match);

    if (!match) return;

    const { gameId, game, symbol } = match;

    // Forfeit game
    game.status = "forfeited";

    const opponentSymbol = symbol === "X" ? "O" : "X";
    const opponentSocketId = game.players[opponentSymbol];

    if (opponentSocketId) {
      io.to(gameId).emit("opponent-disconnected", {
        message: `Player ${symbol} disconnected. You win!`,
        winner: opponentSymbol,
      });
    }

    deleteGame(gameId);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
