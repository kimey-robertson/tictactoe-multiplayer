import { socket } from "../socket";
import type { GridItem } from "./types";

const GridItem: React.FC<{
  gridItem: GridItem;
  gridSize: number;
  gameId: string;
  myTurn: boolean;
}> = ({ gridItem, gridSize, gameId, myTurn }) => {
  const clickGridItem = () => {
    if (gridItem?.player !== null || !myTurn) return;
    socket.emit("make-move", gameId, gridItem.id);
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
      <h1>{gridItem?.player}</h1>
    </div>
  );
};

export default GridItem;
