import { Socket } from "socket.io";
import { createDatasets } from "./tasks/createDatasets";

export const SocketTasks = (socket: Socket) => {
  socket.on("createDatasets", (args) => createDatasets(socket, args));
};
