import { InputDataset, ReturnDataset } from "../interfaces/datasets.interface";
import { InputConfigSchema } from "../../shared/interfaces/config.interface";
import { FileCreator } from "../classes/FileCreator";
import { DatasetsCreator } from "../classes/DatasetsCreator";
import { Socket } from "socket.io";
import { JwtActions } from "../../routes/authentication/utils/JwtActions";

export const createDatasets = async (
  socket: Socket,
  args: any = {}
): Promise<void> => {
  try {
    // autenticar usuario
    const { token } = socket.handshake.auth as any;
    const currentUser = await JwtActions.verifyToken(token);

    // obtener datasets y configuracion para la creacion
    const datasets = args.datasets as InputDataset[];
    const config = args.config as InputConfigSchema;

    // crear datos
    const creatorDatasets = new DatasetsCreator(socket, datasets);
    const allData = await creatorDatasets.createData();

    // crear archivo
    const creator = new FileCreator(allData, config);
    const url = await creator.generateFile();

    // guardar schema en el historial de usuario
    if (currentUser && config.saveSchema)
      await creatorDatasets.saveDataSchema(currentUser._id);

    socket.emit("getDownUrl", { downUrl: url });
  } catch (error) {
    console.log(error);
    socket.emit("createDatasetsError", error);
  }
};
