import "./App.css";
import { useEffect, useState } from "react";
import CreateOrJoinGame from "./components/CreateOrJoinGame";
import { socket } from "./socket";
import TicTacToe from "./components/TicTacToe";
import { GameData, GridItems } from "./components/types";

function App() {
  const [gameIdClient, setGameIdClient] = useState("");
  const [playerSymbolClient, setPlayerSymbolClient] = useState<
    "X" | "O" | null
  >(null);
  const [gameNotFound, setGameNotFound] = useState(false);
  const [players, setPlayers] = useState<{ [key: string]: string }>({});
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [gridItems, setGridItems] = useState<GridItems>([]);

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
        playerSymbol: "X" | "O";
        players: { [key: string]: string };
      }) => {
        console.log("game created", gameId, playerSymbol);
        setGameIdClient(gameId);
        setPlayerSymbolClient(playerSymbol);
        console.log("currentPlayers", currentPlayers);
        setPlayers(currentPlayers);
        setGridItems(
          Array(9)
            .fill(null)
            .map((item, index) => ({ id: index, player: item }))
        );
      }
    );

    socket.on(
      "game-joined",
      ({
        gameId,
        playerSymbol,
      }: {
        gameId: string;
        playerSymbol: "X" | "O";
      }) => {
        console.log("game joined", gameId, playerSymbol);
        setGameIdClient(gameId);
        setPlayerSymbolClient(playerSymbol);
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

    socket.on("game-updated", (game: GameData) => {
      console.log("game updated", game.currentPlayer);
      setCurrentPlayer(game.currentPlayer);
      setGridItems(
        game.board.map((item, index) => ({ id: index, player: item }))
      );
    });

    socket.on("error-message", (error: string) => {
      console.log("error", error);
      alert(error);
    });
  }, []);

  return (
    <>
      {!gameIdClient ? (
        <CreateOrJoinGame gameNotFound={gameNotFound} />
      ) : (
        <TicTacToe
          gridSize={3}
          gameId={gameIdClient}
          players={players}
          playerSymbol={playerSymbolClient}
          myTurn={currentPlayer === playerSymbolClient}
          gridItems={gridItems}
          currentPlayer={currentPlayer}
        />
      )}
    </>
  );
}

export default App;
