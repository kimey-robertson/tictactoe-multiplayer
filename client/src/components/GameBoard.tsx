import type { GridItems } from "./types";
import GridItem from "./GridItem";
const GameBoard: React.FC<{
  gridItems: GridItems;
  gridSize: number;
  gameId: string;
  myTurn: boolean;
}> = ({ gridItems, gridSize, gameId, myTurn }) => (
  <div className="game-board">
    <div
      className={`grid h-[560px] w-[560px] game-board-grid`}
      style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
    >
      {gridItems.map((gridItem, index) => (
        <GridItem
          gridItem={gridItem}
          key={index}
          gridSize={gridSize}
          gameId={gameId}
          myTurn={myTurn}
        />
      ))}
    </div>
  </div>
);

export default GameBoard;
