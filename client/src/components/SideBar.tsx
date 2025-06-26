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
    <div className="m-auto" data-testid="sidebar-container">
      <h1 className="text-2xl flex items-center justify-center mb-3">
        <span className="mr-2">Send this game ID to your friend:</span>
        <span
          className="font-bold cursor-pointer flex items-center hover:text-blue-500 transition-colors duration-300"
          onClick={handleCopyToClipboard}
        >
          {gameId}
          <FaCopy className="ml-2" size={20} />
        </span>
      </h1>
      <h1 className="text-2xl">
        <span className="font-bold">You are player {playerSymbol}</span>
      </h1>
      {isGameFull ? (
        <h1>
          Turn:{" "}
          <span
            className={`font-bold ${
              currentPlayer === "X" ? "text-green-500" : "text-red-500"
            }`}
          >
            {currentPlayer}
          </span>
        </h1>
      ) : (
        <div className="text-center text-2xl">
          Waiting for players to join...
        </div>
      )}
    </div>
  );
};

export default SideBar;
