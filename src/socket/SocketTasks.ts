import { Socket } from "socket.io";
import { createDatasets } from "./main/tasks/createDatasets";

export const SocketTasks = (socket: Socket) => {
  socket.on("disconnect", () => console.log("Client Desconnected"));

  socket.on(
    "createDatasets",
    async (args) => await createDatasets(socket, args)
  );
};
