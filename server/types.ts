// Game data structure that matches what the server sends
export type Game = {
  board: ("X" | "O" | null)[];
  currentPlayer: "X" | "O";
  players: { [key: string]: string };
  status: "waiting" | "in-progress" | "finished" | "forfeited";
  gameId?: string;
};

// Full games object structure (used by server internally)
export type Games = {
  [key: string]: Game;
};

export type Board = ("X" | "O" | null)[];

export type Winner = "X" | "O" | "draw" | null;

export type MoveResult = {
  board?: Board;
  currentPlayer?: "X" | "O";
  winner?: "X" | "O" | "draw" | null;
  error?: string;
};
