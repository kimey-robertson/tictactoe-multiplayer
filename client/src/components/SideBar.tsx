const SideBar: React.FC<{
  currentPlayer: "X" | "O";
  gameId: string;
  players: { [key: string]: string };
  playerSymbol: "X" | "O" | null;
}> = ({ currentPlayer, gameId, players, playerSymbol }) => {
  return (
    <div className="m-auto" data-testid="sidebar-container">
      <h2>Game ID: {gameId}</h2>
      <h2>
        <span
          className={`font-bold ${
            playerSymbol === "X" ? "text-green-500" : ""
          }`}
        >
          Player X:
        </span>{" "}
        {players.X || "Waiting"}
      </h2>
      <h2>
        <span
          className={`font-bold ${
            playerSymbol === "O" ? "text-green-500" : ""
          }`}
        >
          Player O:
        </span>{" "}
        {players.O || "Waiting for player..."}
      </h2>
      <h1>{currentPlayer === "X" ? "Cross's turn" : "Circle's turn"}</h1>
    </div>
  );
};

export default SideBar;
