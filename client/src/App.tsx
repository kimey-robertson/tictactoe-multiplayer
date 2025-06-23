import "./App.css";
// import TicTacToe from "./components/TicTacToe";
import { useEffect, useState } from "react";
import CreateOrJoinGame from "./components/CreateOrJoinGame";
import { socket } from "./socket";
import TicTacToe from "./components/TicTacToe";

function App() {
  const [gameIdClient, setGameIdClient] = useState("");
  const [playerSymbol, setPlayerSymbol] = useState("");
  const [gameNotFound, setGameNotFound] = useState(false);
  const [players, setPlayers] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected to server");
    });

    socket.on(
      "game-created",
      ({
        gameId,
        playerSymbol,
        players: currentPlayers,
      }: {
        gameId: string;
        playerSymbol: string;
        players: { [key: string]: string };
      }) => {
        console.log("game created", gameId, playerSymbol);
        setGameIdClient(gameId);
        setPlayerSymbol(playerSymbol);
        console.log("currentPlayers", currentPlayers);
        setPlayers(currentPlayers);
      }
    );

    socket.on(
      "game-joined",
      ({ gameId, playerSymbol }: { gameId: string; playerSymbol: string }) => {
        console.log("game joined", gameId, playerSymbol);
        setGameIdClient(gameId);
        setPlayerSymbol(playerSymbol);
      }
    );

    socket.on("player-joined", (game) => {
      console.log("player joined", game);
      setPlayers(game.players);
    });

    socket.on("game-not-found", () => {
      console.log("game not found");
      setGameNotFound(true);
    });
  }, []);

  return (
    <>
      {!gameIdClient ? (
        <CreateOrJoinGame gameNotFound={gameNotFound} />
      ) : (
        <TicTacToe gridSize={3} gameId={gameIdClient} players={players} />
      )}
    </>
  );
}

export default App;
