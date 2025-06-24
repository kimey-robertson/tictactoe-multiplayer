import { Games } from "./types";

const games: Games = {};

function createGame(playerSocketId: string) {
  const gameId = Math.random().toString(36).substring(2, 6); // short ID
  games[gameId] = {
    gameId,
    board: Array(9).fill(null),
    currentPlayer: "X",
    players: { X: playerSocketId },
    status: "waiting",
  };
  const game = games[gameId];
  console.log("game:", game);
  console.log("games:", games);
  return game;
}

function joinGame(gameId: string, playerSocketId: string) {
  const game = games[gameId];
  if (!game || game.players.O) return null;

  game.players.O = playerSocketId;
  game.status = "in-progress";
  return {
    gameId,
    board: game.board,
    currentPlayer: game.currentPlayer,
    players: game.players,
    status: game.status,
  };
}

function makeMove(gameId: string, playerSocketId: string, index: number) {
  const game = games[gameId];
  if (!game || game.status !== "in-progress") return { error: "Invalid game" };

  const playerSymbol = Object.entries(game.players).find(
    ([, id]) => id === playerSocketId
  )?.[0];

  if (!playerSymbol) return { error: "Player not found" };

  if (playerSymbol !== game.currentPlayer) return { error: "Not your turn" };

  if (game.board[index] !== null) return { error: "Cell already taken" };

  game.board[index] = playerSymbol as "X" | "O";

  if (!game.board.includes(null)) {
    game.status = "finished";
    return { board: game.board, winner: "draw" };
  }

  game.currentPlayer = playerSymbol === "X" ? "O" : "X";

  return {
    board: game.board,
    currentPlayer: game.currentPlayer,
    playerSymbol,
  };
}

function getGameByPlayerSocketId(playerSocketId: string) {
  // Check all games for the player socket id and get the game and symbol
  for (const [gameId, game] of Object.entries(games)) {
    const symbol = Object.entries(game.players).find(
      ([, id]) => id === playerSocketId
    )?.[0];
    if (symbol) return { gameId, game, symbol };
  }
  return null;
}

function deleteGame(gameId: string) {
  delete games[gameId];
}

export { createGame, joinGame, makeMove, getGameByPlayerSocketId, deleteGame };
