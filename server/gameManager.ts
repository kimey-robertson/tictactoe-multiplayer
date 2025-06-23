const games: {
  [key: string]: {
    board: string[];
    currentPlayer: string;
    players: { [key: string]: string };
    status: string;
  };
} = {};

function createGame(playerSocketId: string) {
  const gameId = Math.random().toString(36).substring(2, 6); // short ID
  games[gameId] = {
    board: Array(9).fill(null),
    currentPlayer: "X",
    players: { X: playerSocketId },
    status: "waiting",
  };
  console.log(games);
  return { gameId, playerSymbol: "X", players: games[gameId].players };
}

function joinGame(gameId: string, playerSocketId: string) {
  const game = games[gameId];
  if (!game || game.players.O) return null;

  game.players.O = playerSocketId;
  game.status = "in-progress";
  console.log(games);
  return {
    gameId,
    board: game.board,
    currentPlayer: game.currentPlayer,
    playerSymbol: "O",
    players: game.players,
    status: game.status,
  };
}

export { createGame, joinGame };
