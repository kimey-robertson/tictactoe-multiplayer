export type Player = "X" | "O";
export type GridItem = { id: number; player: null | Player };
export type GridItems = GridItem[];

// Game data structure that matches what the server sends
export type GameData = {
  board: ("X" | "O" | null)[];
  currentPlayer: "X" | "O";
  players: { [key: string]: string };
  status: "waiting" | "in-progress" | "finished";
};

// Full games object structure (used by server internally)
export type Game = {
  [key: string]: GameData;
};
