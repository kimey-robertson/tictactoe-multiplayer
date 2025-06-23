import type { GridItem } from "./types";

const GridItem: React.FC<{
  gridItem: GridItem;
  selectGridItem: (id: number) => void;
  gridSize: number;
}> = ({ gridItem, selectGridItem, gridSize }) => {
  const clickGridItem = () => {
    if (gridItem.player !== null) return;
    selectGridItem(gridItem.id);
  };
  return (
    <div
      onClick={() => clickGridItem()}
      className="grid-item"
      data-testid="grid-item"
      style={{
        height: `${600 / gridSize}px`,
        width: `${600 / gridSize}px`,
      }}
    >
      {gridItem.player === "Cross" ? (
        <h1>X</h1>
      ) : gridItem.player === "Circle" ? (
        <h1>O</h1>
      ) : null}
    </div>
  );
};

export default GridItem;
