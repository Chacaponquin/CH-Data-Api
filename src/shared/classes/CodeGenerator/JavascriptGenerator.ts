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

  public generateDatasetArray(
    datasetFields: { [path: string]: ReturnValue | ReturnValue[] }[]
  ): string {
    let returnArray = `[`;

    for (let i = 0; i < datasetFields.length; i++) {
      if (i !== datasetFields.length - 1)
        returnArray += `${this.generateObjectData(datasetFields[i])}, `;
      else returnArray += `${this.generateObjectData(datasetFields[i])}`;
    }

    returnArray += "]\n";

    return returnArray;
  }

  private filterTypeValue(value: ReturnValue | ReturnValue[]): string {
    let returnValue = "undefined";

    if (typeof value === "string") returnValue = this.generateString(value);
    else if (typeof value === "number" || typeof value === "boolean")
      returnValue = `${value}`;
    else if (typeof value === "object") {
      if (Array.isArray(value)) returnValue = this.generateArray(value);
      else {
        if (value === null) returnValue = "null";
        else if (value instanceof Date) returnValue = `${value.toString()}`;
        else returnValue = this.generateObjectData(value);
      }
    }

    return returnValue;
  }

  public generateObjectData(doc: {
    [key: string]: ReturnValue | ReturnValue[];
  }): string {
    let objectData = `{`;

    const keys = Object.keys(doc);
    for (const key of keys) {
      const value = this.filterTypeValue(doc[key]);
      objectData += `${key}: ${value},`;
    }

    objectData += "}";

    return objectData;
  }

  private generateArray(array: ReturnValue[]): string {
    let returnArray = "[";

    for (let i = 0; i < array.length; i++) {
      if (i !== array.length - 1) {
        returnArray += `${this.filterTypeValue(array[i])}, `;
      } else returnArray += `${this.filterTypeValue(array[i])}`;
    }

    returnArray += "]";

    return returnArray;
  }

  private generateString(value: string): string {
    return `"${value}"`;
  }
}
