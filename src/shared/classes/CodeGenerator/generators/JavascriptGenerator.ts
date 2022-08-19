import { ReturnDataset } from "../../../../socket/main/interfaces/datasets.interface";
import { Generator } from "./Generator";
import { FormatterData } from "../../FormatterData";
import fs from "fs";

export class JavascriptGenerator extends Generator {
  constructor(datasets: ReturnDataset[]) {
    super(datasets);
  }

  public async generateCode(): Promise<string> {
    let returnData = ``;

    for (const dat of this.data) {
      returnData += `const ${FormatterData.capitalizeText(
        dat.name
      )} = ${this.generateDatasetArray(dat.documents)};\n`;
    }

    const fieldName = `data${Date.now()}.js`;

    await fs.promises.writeFile(`./public/${fieldName}`, returnData, "utf8");

    return `util/downloadData/${fieldName}`;
  }

  private generateDatasetArray(datasetFields: any[]): string {
    let returnArray = `[`;

    for (const field of datasetFields) {
      const values = Object.values(field) as any[];

      let objectData = `{`;

      for (let i = 0; i < values.length; i++) {
        let key = Object.keys(field)[i];
        const value = this.filterTypeValue(values[i]);
        objectData += `${key}: ${value},`;
      }

      objectData += "},";
      returnArray += `${objectData}`;
    }

    returnArray += "] ";

    return returnArray;
  }

  private filterTypeValue(value: any): string {
    let returnValue = "undefined";

    if (typeof value == "string") returnValue = this.generateString(value);
    else if (typeof value == "number" || typeof value == "boolean")
      returnValue = `${value}`;
    else if (typeof value == "object") {
      if (Array.isArray(value)) returnValue = this.generateArray(value);
    }

    return returnValue;
  }

  private generateArray(array: string[] | number[]): string {
    let returnArray = "[";

    for (let value of array) {
      returnArray += `${this.filterTypeValue(value)}, `;
    }

    returnArray += "]";

    return returnArray;
  }

  private generateString(value: string): string {
    return `"${value}"`;
  }
}
