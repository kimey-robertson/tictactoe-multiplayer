import CreateOrJoinGame from "./CreateOrJoinGame";
import Lobby from "./Lobby";
import { useGameSockets } from "../hooks/useGameSockets";

const Home = () => {
  const {
    gameIdClient,
    playerSymbol,
    gameNotFound,
    connected,
    playersClient,
    currentPlayer,
    gridItems,
  } = useGameSockets();

  if (!connected) {
    return (
      <div className="flex items-center justify-center h-full text-2xl">
        Attempting to connect to server...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-full">
      {!gameIdClient ? (
        <CreateOrJoinGame gameNotFound={gameNotFound} />
      ) : (
        <Lobby
          gridSize={3}
          gameId={gameIdClient}
          players={playersClient}
          playerSymbol={playerSymbol}
          myTurn={currentPlayer === playerSymbol}
          gridItems={gridItems}
          currentPlayer={currentPlayer}
        />
      )}
    </div>
  );
};

export default Home;
