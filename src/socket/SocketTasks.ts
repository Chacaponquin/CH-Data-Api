import { Socket } from "socket.io";
import { createDatasets } from "./tasks/createDatasets";

export const SocketTasks = (socket: Socket) => {
  socket.on(
    "createDatasets",
    async (args) => await createDatasets(socket, args)
  );
};
