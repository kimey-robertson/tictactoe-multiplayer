import { useEffect, useState } from "react";
import GameBoard from "./GameBoard";
import SideBar from "./SideBar";
import { checkWinCondition2, draw, getDefaultGridItems } from "./utils";
import { GridItems, Player } from "./types";

const TicTacToe: React.FC<{
  gridSize: number;
  gameId: string;
  players: { [key: string]: string };
}> = ({ gridSize, gameId, players }) => {
  const [currentPlayerIsCross, setCurrentPlayerIsCross] =
    useState<boolean>(true);
  const [gridItems, setGridItems] = useState<GridItems>(
    getDefaultGridItems(gridSize)
  );

  const toggleCurrentPlayer = () => {
    setCurrentPlayerIsCross((prev) => !prev);
  };

  const handleUpdateGridItems = (id: number, newPlayer: Player) => {
    setGridItems((prevGridItems) =>
      prevGridItems.map((item) =>
        item.id === id ? { ...item, player: newPlayer } : item
      )
    );
  };

  const handleResetGridItems = () => {
    setGridItems(getDefaultGridItems(gridSize));
  };

  const selectGridItem = (id: number) => {
    const newPlayer = currentPlayerIsCross ? "Cross" : "Circle";
    handleUpdateGridItems(id, newPlayer);
    toggleCurrentPlayer();
  };

  useEffect(() => {
    const player: Player = !currentPlayerIsCross ? "Cross" : "Circle";
    if (checkWinCondition2(gridItems, currentPlayerIsCross, gridSize)) {
      setTimeout(() => alert(`${player} has won!`));
      handleResetGridItems();
      setCurrentPlayerIsCross(true);
    } else if (draw(gridItems)) {
      setTimeout(() => alert(`Draw! Play again?`));
      handleResetGridItems();
      setCurrentPlayerIsCross(true);
    }
  }, [currentPlayerIsCross, gridItems]);

  return (
    <div className="flex game-container" data-testid={"game-container"}>
      <SideBar
        currentPlayerIsCross={currentPlayerIsCross}
        setCurrentPlayerIsCross={setCurrentPlayerIsCross}
        handleResetGridItems={handleResetGridItems}
        gameId={gameId}
        players={players}
      />
      <GameBoard
        gridItems={gridItems}
        selectGridItem={selectGridItem}
        gridSize={gridSize}
      />
    </div>
  );
};

export default TicTacToe;
