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
    <div className="flex flex-col game-container" data-testid={"game-container"}>
      <SideBar
        currentPlayer={currentPlayer}
        gameId={gameId}
        players={players}
        playerSymbol={playerSymbol}
        isGameFull={isGameFull}
      />
      {isGameFull ? (
        <GameBoard
          gridItems={gridItems}
          gridSize={gridSize}
          gameId={gameId}
          myTurn={myTurn}
        />
      ) : null}
    </div>
  );
};

export default Lobby;
