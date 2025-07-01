import { createServer } from "./server/config";
import { handleGameEvents } from "./socket/socketHandlers";

const { server, io, PORT } = createServer();

// Setup socket event handlers
io.on("connection", (socket) => {
  handleGameEvents(io, socket);
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
