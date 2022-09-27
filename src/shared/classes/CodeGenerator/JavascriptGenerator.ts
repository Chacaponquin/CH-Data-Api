import { CodeGenerator } from "./CodeGenerator";
import fs from "fs";
import { FormatterData } from "../FormatterData";
import { ReturnDataset } from "../../../socket/interfaces/datasets.interface";
import { ConfigFileArgument } from "../../interfaces/config.interface";
import { ReturnValue } from "../../interfaces/fields.interface";

export class JavascriptGenerator extends CodeGenerator {
  constructor(
    datasets: ReturnDataset<ReturnValue>[],
    args: { [path: string]: ConfigFileArgument }
  ) {
    super(datasets, args, "js");
  }

  protected async generateCodeFile(): Promise<string> {
    let returnData = ``;

    for (const dat of this.data) {
      returnData += `const ${FormatterData.capitalizeText(
        dat.name
      )} = ${this.generateDatasetArray(dat.documents)};\n`;
    }

    const fileName = this.generateFileName();

    await fs.promises.writeFile(
      this.generatePublicRoute(fileName),
      returnData,
      "utf-8"
    );

    return fileName;
  }

  public generateDatasetArray(datasetFields: any[]): string {
    let returnArray = `[`;

    for (const doc of datasetFields) {
      returnArray += `${this.generateObjectData(doc)}`;
    }

    returnArray += "] ";

    return returnArray;
  }

  public generateObjectData(doc: any): string {
    let objectData = `{`;

    const values = Object.values(doc) as any[];

    for (let i = 0; i < values.length; i++) {
      let key = Object.keys(doc)[i];
      const value = this.filterTypeValue(values[i]);
      objectData += `${key}: ${value},`;
    }

    objectData += "},";

    return objectData;
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
