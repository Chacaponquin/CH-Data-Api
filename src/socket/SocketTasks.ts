import { Socket } from "socket.io";
import { createDatasets } from "./main/tasks/createDatasets";

export const SocketTasks = (socket: Socket) => {
  console.log("Hola");
  socket.on("disconnect", () => console.log("Client Desconnected"));
  socket.on("connection", () => console.log("Hola"));

  socket.on(
    "createDatasets",
    async (args) => await createDatasets(socket, args)
  );
};
