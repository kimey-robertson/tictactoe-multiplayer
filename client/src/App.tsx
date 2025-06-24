import "./App.css";
import { useEffect, useState } from "react";
import CreateOrJoinGame from "./components/CreateOrJoinGame";
import { socket } from "./socket";
import TicTacToe from "./components/TicTacToe";
import { GridItems } from "./components/types";
import { Game, MoveResult } from "../../server/types";

function App() {
  const [gameIdClient, setGameIdClient] = useState("");
  const [playerSymbol, setPlayerSymbol] = useState<"X" | "O">("X");
  const [gameNotFound, setGameNotFound] = useState(false);
  const [playersClient, setPlayersClient] = useState<{ [key: string]: string }>(
    {}
  );
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [gridItems, setGridItems] = useState<GridItems>([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected to server");
    });

    socket.on("game-created", (game: Game) => {
      if (!game.gameId) {
        socket.emit("error-message", "Could not create game");
        return;
      }
      setGameIdClient(game.gameId);
      setPlayerSymbol("X");
      setPlayersClient(game.players);
      setGridItems(
        Array(9)
          .fill(null)
          .map((item, index) => ({ id: index, player: item }))
      );
    });

    socket.on("game-joined", (game: Game) => {
      console.log("game joined", game);
      if (!game.gameId) {
        socket.emit("error-message", "Could not join game");
        return;
      }
      setGameIdClient(game.gameId);
      setPlayerSymbol("O");
    });

    socket.on("player-joined", (game: Game) => {
      console.log("player joined", game);
      setPlayersClient(game.players);
    });

    socket.on("game-not-found", () => {
      console.log("game not found");
      setGameNotFound(true);
    });

    socket.on("game-updated", (moveResult: MoveResult) => {
      if (moveResult.board && moveResult.currentPlayer) {
        setCurrentPlayer(moveResult.currentPlayer);
        setGridItems(
          moveResult.board.map((item, index) => ({ id: index, player: item }))
        );
      }
      if (moveResult.error) {
        alert(moveResult.error);
        return;
      }
      if (moveResult.winner) {
        alert(`${moveResult.winner} wins!`);
        return;
      }
    });

    socket.on("error-message", (error: string) => {
      console.log("error", error);
      alert(error);
    });
  }, []);

  useEffect(() => {
    const handleDisconnect = ({ message }: { message: string }) => {
      socket.disconnect();
      alert(message);
      // Have to reset the game state
    };
    socket.on("opponent-disconnected", handleDisconnect);

    return () => {
      socket.off("opponent-disconnected", handleDisconnect);
    };
  }, []);

  return (
    <>
      {!gameIdClient ? (
        <CreateOrJoinGame gameNotFound={gameNotFound} />
      ) : (
        <TicTacToe
          gridSize={3}
          gameId={gameIdClient}
          players={playersClient}
          playerSymbol={playerSymbol}
          myTurn={currentPlayer === playerSymbol}
          gridItems={gridItems}
          currentPlayer={currentPlayer}
        />
      )}
    </>
  );
}

export default App;
