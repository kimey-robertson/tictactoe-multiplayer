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
      <div className="flex items-center justify-center h-full p-4">
        <div className="text-lg sm:text-xl md:text-2xl text-center">
          Attempting to connect to server...
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-full w-full px-4">
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
