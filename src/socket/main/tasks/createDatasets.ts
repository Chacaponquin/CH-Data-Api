import { Dataset, ReturnDataset } from "../interfaces/datasets.interface";
import { InputConfigSchema } from "../../../shared/interfaces/config.interface";
import { CreateDataFile } from "../classes/CreateDataFile";
import { CreateDatasets } from "../classes/CreateDatasets";
import { Socket } from "socket.io";
import { JwtActions } from "../../../shared/classes/JwtActions";

export const createDatasets = async (
  socket: Socket,
  args: any = {}
): Promise<void> => {
 

  try {
    const { token } = socket.handshake.auth as any;
    const currentUser = await JwtActions.verifyToken(token);

    const datasets: Dataset[] = args.datasets as Dataset[];
    const config = args.config as InputConfigSchema;

    const creatorDatasets = new CreateDatasets(socket, datasets);

    const allData: ReturnDataset[] = await creatorDatasets.createData();

    const creator = new CreateDataFile(allData, config);

    const url = await creator.generateFile();

    if (currentUser && config.saveSchema)
      await creatorDatasets.saveDataSchema(currentUser._id);

    socket.emit("getDownUrl", { downUrl: url });
  } catch (error) {
    console.log(error);
    socket.emit("createDatasetsError", error);
  }
};
