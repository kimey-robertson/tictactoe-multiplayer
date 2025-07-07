import { useState } from "react";
import { socket } from "../socket";

const CreateOrJoinGame = ({ gameNotFound }: { gameNotFound: boolean }) => {
  const [join, setJoin] = useState(false);
  const [gameIdInput, setGameIdInput] = useState("");

  const handleJoinGame = () => {
    socket.emit("join-game", gameIdInput);
    if (!gameNotFound) {
      setJoin(true);
    }
  };

  const handleCreateGame = () => {
    socket.emit("create-game");
    console.log("clicked created game");
  };

  if (join) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-4 max-w-md mx-auto">
        <input
          placeholder="Enter Game ID"
          value={gameIdInput}
          onChange={(e) => setGameIdInput(e.target.value)}
          className="w-full px-4 py-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-black"
        />
        <button
          onClick={handleJoinGame}
          className="w-full px-6 py-3 text-lg font-semibold bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Join Game
        </button>
        <button
          onClick={() => setJoin(false)}
          className="w-full px-6 py-2 text-base font-medium bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Back
        </button>
        {gameNotFound && (
          <p className="text-red-500 text-center mt-3 text-sm sm:text-base">
            Game not found, try again
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="create-or-join-game">
      <button
        onClick={handleCreateGame}
        className="px-8 py-4 text-lg font-semibold bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 min-w-[200px]"
      >
        Create Game
      </button>
      <button
        onClick={() => setJoin(true)}
        className="px-8 py-4 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 min-w-[200px]"
      >
        Join Game
      </button>
    </div>
  );
};

export default CreateOrJoinGame;
