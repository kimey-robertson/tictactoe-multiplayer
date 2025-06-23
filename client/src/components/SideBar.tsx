const SideBar: React.FC<{
  currentPlayerIsCross: boolean;
  setCurrentPlayerIsCross: (boolean: boolean) => void;
  handleResetGridItems: () => void;
  gameId: string;
  players: { [key: string]: string };
}> = ({
  currentPlayerIsCross,
  setCurrentPlayerIsCross,
  handleResetGridItems,
  gameId,
  players,
}) => {
  return (
    <div className="m-auto" data-testid="sidebar-container">
      <h2>Game ID: {gameId}</h2>
      <h2>
        <span className="font-bold">Player X:</span> {players.X}
      </h2>
      <h2>
        <span className="font-bold">Player O:</span> {players.O}
      </h2>
      <h1>
        {currentPlayerIsCross
          ? "Cross's turn"
          : !currentPlayerIsCross
          ? "Circle's turn"
          : null}
      </h1>
      <button
        onClick={() => {
          handleResetGridItems();
          setCurrentPlayerIsCross(true);
        }}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Reset
      </button>
    </div>
  );
};

export default SideBar;
