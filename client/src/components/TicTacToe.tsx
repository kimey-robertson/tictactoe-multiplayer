import GameBoard from "./GameBoard";
import SideBar from "./SideBar";
import { GridItems } from "./types";

const TicTacToe: React.FC<{
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
  return (
    <div className="flex game-container" data-testid={"game-container"}>
      <SideBar
        currentPlayer={currentPlayer}
        gameId={gameId}
        players={players}
        playerSymbol={playerSymbol}
      />
      <GameBoard
        gridItems={gridItems}
        gridSize={gridSize}
        gameId={gameId}
        myTurn={myTurn}
      />
    </div>
  );
};

export default TicTacToe;
