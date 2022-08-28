import { ReturnDataset } from "../../socket/main/interfaces/datasets.interface";
import { FormatterData } from "./FormatterData";
import { Generator } from "./Generator";
import fs from "fs";

export class JSONGenerator extends Generator {
  constructor(data: ReturnDataset[], args: any) {
    super(data, "json", args);
  }

  public async generateFile(): Promise<string> {
    const dataToTransform =
      this.args.data_schema === "Object"
        ? FormatterData.transformReturnDataToObject(this.data)
        : this.data;

    if (this.args.separate_datasets) {
      let fileNamesArray: string[] = [];

      if (Array.isArray(dataToTransform)) {
        for (const dat of dataToTransform) {
          const fileName = this.generateFileName();
          const jsonContent = JSON.stringify(dat);
          const publicRoute = this.generatePublicRoute(fileName);

          await fs.promises.writeFile(publicRoute, jsonContent, "utf8");

          fileNamesArray.push(publicRoute);
        }
      } else {
        let theObjects = [];

        const values = Object.values(dataToTransform);
        const keys = Object.keys(dataToTransform);

        for (let i = 0; i < values.length; i++) {
          theObjects.push({ [keys[i]]: values[i] });
        }

        for (const dat of theObjects) {
          const fileName = this.generateFileName();
          const jsonContent = JSON.stringify(dat);
          const publicRoute = this.generatePublicRoute(fileName);

          await fs.promises.writeFile(publicRoute, jsonContent, "utf8");

          fileNamesArray.push(publicRoute);
        }
      }

      const zipFileName = this.generateZipFile(fileNamesArray);

      return zipFileName;
    } else {
      const jsonContent = JSON.stringify(dataToTransform);

      const fileName = this.generateFileName();

      await fs.promises.writeFile(
        this.generatePublicRoute(fileName),
        jsonContent,
        "utf8"
      );

      return fileName;
    }
  }
}
