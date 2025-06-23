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
      <div>
        <input
          placeholder="Enter Game ID"
          onChange={(e) => setGameIdInput(e.target.value)}
        />
        <button onClick={handleJoinGame} className="ml-3">
          Join
        </button>
        {gameNotFound && (
          <p className="text-red-500 mt-3">Game not found, try again</p>
        )}
      </div>
    );
  }

  if (!join) {
    return (
      <div className="create-or-join-game">
        <button
          onClick={() => {
            handleCreateGame();
          }}
        >
          Create Game
        </button>
        <button
          onClick={() => {
            setJoin(true);
          }}
        >
          Join Game
        </button>
      </div>
    );
  }
};

export default CreateOrJoinGame;
