import { useEffect, useState } from "react";
import { getSocket } from "../socket";
import { GridItems } from "../components/types";
import { Game, MoveResult } from "../../../types";
import { toast } from "react-hot-toast";

export const useGameSockets = () => {
  const socket = getSocket();
  const [gameIdClient, setGameIdClient] = useState("");
  const [playerSymbol, setPlayerSymbol] = useState<"X" | "O">("X");
  const [gameNotFound, setGameNotFound] = useState(false);
  const [connected, setConnected] = useState(false);
  const [playersClient, setPlayersClient] = useState<{ [key: string]: string }>(
    {}
  );
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [gridItems, setGridItems] = useState<GridItems>(
    Array(9)
      .fill(null)
      .map((item, index) => ({ id: index, player: item }))
  );

  useEffect(() => {
    const handleConnect = () => {
      console.log("connected to server");
      setConnected(true);
    };

    const handleGameCreated = (game: Game) => {
      if (!game.gameId) {
        socket.emit("error-message", "Could not create game");
        return;
      }
      setGameIdClient(game.gameId);
      setPlayerSymbol("X");
      setPlayersClient(game.players);
    };

    const handleGameJoined = (game: Game) => {
      console.log("game joined", game);
      if (!game.gameId) {
        socket.emit("error-message", "Could not join game");
        return;
      }
      setGameIdClient(game.gameId);
      setPlayerSymbol("O");
    };

    const handlePlayerJoined = (game: Game) => {
      console.log("player joined", game);
      setPlayersClient(game.players);
    };

    const handleGameNotFound = () => {
      console.log("game not found");
      setGameNotFound(true);
    };

    const handleGameUpdated = (moveResult: MoveResult) => {
      if (moveResult.board && moveResult.currentPlayer) {
        setCurrentPlayer(moveResult.currentPlayer);
        setGridItems(
          moveResult.board.map((item, index) => ({ id: index, player: item }))
        );
      }
      if (moveResult.error) {
        toast.error(moveResult.error);
        return;
      }
      if (moveResult.winner && moveResult.board) {
        setGridItems(
          moveResult.board.map((item, index) => ({ id: index, player: item }))
        );
        toast.success(`${moveResult.winner} wins!`);
        return;
      }
    };

    const handleErrorMessage = (error: string) => {
      console.log("error", error);
      toast.error(error);
    };

    const handleOpponentDisconnected = ({ message }: { message: string }) => {
      socket.disconnect();
      toast.error(message);
      // Reset game state
      setGameIdClient("");
      setPlayerSymbol("X");
      setPlayersClient({});
      setCurrentPlayer("X");
      setGridItems(
        Array(9)
          .fill(null)
          .map((item, index) => ({ id: index, player: item }))
      );
    };

    // Attach all listeners
    socket.on("connect", handleConnect);
    socket.on("game-created", handleGameCreated);
    socket.on("game-joined", handleGameJoined);
    socket.on("player-joined", handlePlayerJoined);
    socket.on("game-not-found", handleGameNotFound);
    socket.on("game-updated", handleGameUpdated);
    socket.on("error-message", handleErrorMessage);
    socket.on("opponent-disconnected", handleOpponentDisconnected);

    return () => {
      // Clean up all listeners
      socket.off("connect", handleConnect);
      socket.off("game-created", handleGameCreated);
      socket.off("game-joined", handleGameJoined);
      socket.off("player-joined", handlePlayerJoined);
      socket.off("game-not-found", handleGameNotFound);
      socket.off("game-updated", handleGameUpdated);
      socket.off("error-message", handleErrorMessage);
      socket.off("opponent-disconnected", handleOpponentDisconnected);
    };
  }, []);

  return {
    gameIdClient,
    playerSymbol,
    gameNotFound,
    connected,
    playersClient,
    currentPlayer,
    gridItems,
  };
};
