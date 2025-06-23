import type { GridItems } from "./types";
import GridItem from "./GridItem";
const GameBoard: React.FC<{
  gridItems: GridItems;
  selectGridItem: (id: number) => void;
  gridSize: number;
}> = ({ gridItems, selectGridItem, gridSize }) => (
  <div className="game-board">
    <div
      className={`grid h-[600px]`}
      style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
    >
      {gridItems.map((gridItem, index) => (
        <GridItem
          gridItem={gridItem}
          key={index}
          selectGridItem={selectGridItem}
          gridSize={gridSize}
        />
      ))}
    </div>
  </div>
);

export default GameBoard;
