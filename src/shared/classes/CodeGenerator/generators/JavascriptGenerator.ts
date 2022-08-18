import { ReturnDataset } from "../../../../socket/main/interfaces/datasets.interface";
import { Generator } from "./Generator";
import fs from "fs";

export class JavascriptGenerator extends Generator {
  constructor(datasets: ReturnDataset[]) {
    super(datasets);
  }

  public async generateCode(): Promise<string> {
    let returnData = ``;

    for (const dat of this.data) {
      returnData += `const ${dat.name} = ${this.generateDatasetArray(
        dat.documents
      )};\n`;
    }

    const fieldName = `data${Date.now()}.js`;

    await fs.promises.writeFile(`./public/${fieldName}`, returnData, "utf8");

    return `util/downloadData/${fieldName}`;
  }

  private generateDatasetArray(datasetFields: any[]): string {
    let returnArray = `[`;

    for (const field of datasetFields) {
      const values = Object.values(field) as string[];

      let objectData = `{`;

      for (let i = 0; i < values.length; i++) {
        let key = Object.keys(field)[i];
        let value = "";

        if (typeof values[i] == "string")
          value = this.generateString(values[i]);
        else if (typeof values[i] == "number") value = values[i];

        objectData += `${key}: ${value},`;
      }

      objectData += "},";
      returnArray += `${objectData}`;
    }

    returnArray += "] ";

    return returnArray;
  }

  private generateString(value: string): string {
    return `"${value}"`;
  }
}
