import { Socket } from "socket.io";
import { createDatasets } from "./tasks/createDatasets";

export const SocketTasks = (socket: Socket) => {
  socket.on("disconnect", () => console.log("Client Desconnected"));
  socket.on("connection", () => console.log("Hola"));

  socket.on("createDatasets", (args) => createDatasets(socket, args));
};
