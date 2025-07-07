import { toast } from "react-hot-toast";
import { copyToClipboard } from "./utils";
import { FaCopy } from "react-icons/fa";

const SideBar: React.FC<{
  currentPlayer: "X" | "O";
  gameId: string;
  players: { [key: string]: string };
  playerSymbol: "X" | "O" | null;
  isGameFull: boolean;
}> = ({ currentPlayer, gameId, playerSymbol, isGameFull }) => {
  function handleCopyToClipboard() {
    copyToClipboard(gameId);
    toast.success("Game ID copied to clipboard");
  }
  return (
    <div
      className="m-auto mb-3 px-4 text-center"
      data-testid="sidebar-container"
    >
      {!isGameFull ? (
        <div className="mb-3">
          <h1 className="text-lg sm:text-xl md:text-2xl flex flex-col sm:flex-row items-center justify-center mb-2 sm:mb-3">
            <span className="mb-2 sm:mb-0 sm:mr-2">
              Send this game ID to your friend:
            </span>
            <span
              className="font-bold cursor-pointer flex items-center hover:text-blue-500 transition-colors duration-300 text-base sm:text-lg md:text-xl"
              onClick={handleCopyToClipboard}
            >
              {gameId}
              <FaCopy className="ml-2" size={16} />
            </span>
          </h1>
        </div>
      ) : null}
      <h1 className="text-lg sm:text-xl md:text-2xl mb-2">
        <span className="font-bold">You are player {playerSymbol}</span>
      </h1>
      {isGameFull ? (
        <h1 className="text-base sm:text-lg md:text-xl">
          Turn:{" "}
          <span
            className={`font-bold ${
              playerSymbol === currentPlayer ? "text-green-500" : "text-red-500"
            }`}
          >
            {currentPlayer}
          </span>
        </h1>
      ) : (
        <div className="text-center text-lg sm:text-xl md:text-2xl">
          Waiting for players to join...
        </div>
      )}
    </div>
  );
};

export default SideBar;
