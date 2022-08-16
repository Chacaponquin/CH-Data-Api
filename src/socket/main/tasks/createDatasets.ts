import { Dataset, ReturnDataset } from "../interfaces/datasets.interface";
import { ConfigSchema } from "../interfaces/config.interface";
import { CreateDataFile } from "../classes/CreateDataFile";
import { CreateDatasets } from "../classes/CreateDatasets";
import { Socket } from "socket.io";

export const createDatasets = async (socket: Socket, args: any = {}) => {
  const currentUser = args.user as any;

  try {
    const datasets: Dataset[] = args.datasets as Dataset[];
    const config = args.config as ConfigSchema;

    const creatorDatasets = new CreateDatasets(datasets);

    const allData: ReturnDataset[] = await creatorDatasets.createData();
    const creator = new CreateDataFile(allData, config);

    const url = await creator.generateFile(config.fileType);

    if (currentUser && config.saveSchema)
      await creatorDatasets.saveDataSchema(currentUser._id);

    socket.emit("getDownUrl", { downUrl: url });
  } catch (error) {
    console.log(error);
    socket.emit("createDatasetsError", error);
  }
};
