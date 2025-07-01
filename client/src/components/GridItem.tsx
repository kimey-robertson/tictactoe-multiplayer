import { socket } from "../socket";
import type { GridItem } from "./types";

const GridItem: React.FC<{
  gridItem: GridItem;
  gridSize: number;
  gameId: string;
  myTurn: boolean;
}> = ({ gridItem, gameId, myTurn }) => {
  const clickGridItem = () => {
    if (gridItem?.player !== null || !myTurn) return;
    socket.emit("make-move", gameId, gridItem.id);
  };
  return (
    <div
      onClick={() => clickGridItem()}
      className="grid-item"
      data-testid="grid-item"
    >
      <span className="absolute">{gridItem?.player}</span>
    </div>
  );
};

export default GridItem;
