import GameBoard from "./GameBoard";
import SideBar from "./SideBar";
import { GridItems } from "./types";

const Lobby: React.FC<{
  gridSize: number;
  gameId: string;
  players: { [key: string]: string };
  playerSymbol: "X" | "O" | null;
  myTurn: boolean;
  gridItems: GridItems;
  currentPlayer: "X" | "O";
}> = ({
  gridSize,
  gameId,
  players,
  playerSymbol,
  myTurn,
  gridItems,
  currentPlayer,
}) => {
  const isGameFull = Object.keys(players).length === 2;

  return (
    <div
      className="flex flex-col game-container w-full max-w-4xl mx-auto px-4"
      data-testid={"game-container"}
    >
      <SideBar
        currentPlayer={currentPlayer}
        gameId={gameId}
        players={players}
        playerSymbol={playerSymbol}
        isGameFull={isGameFull}
      />
      {isGameFull ? (
        <div className="flex justify-center items-center w-full">
          <GameBoard
            gridItems={gridItems}
            gridSize={gridSize}
            gameId={gameId}
            myTurn={myTurn}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Lobby;
