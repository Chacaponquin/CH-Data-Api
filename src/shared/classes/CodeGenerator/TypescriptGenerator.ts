import { CodeGenerator } from "./CodeGenerator";
import { JavascriptGenerator } from "./JavascriptGenerator";
import fs from "fs";
import { FormatterData } from "../FormatterData";
import { ReturnDataset } from "../../../socket/main/interfaces/datasets.interface";

export class TypescriptGenerator extends CodeGenerator {
  constructor(
    datasets: ReturnDataset[],
    args: { [path: string]: string | boolean }
  ) {
    super(datasets, args, "ts");
  }

  protected async generateCodeFile(): Promise<string> {
    let allCode: string = ``;

    if (this.args.generateInterfaces) {
      for (const dat of this.data) {
        allCode += this.generateDatasetInterface(dat);
      }
    }

    for (const dat of this.data) {
      const javascriptCode = new JavascriptGenerator(
        this.data,
        {}
      ).generateDatasetArray(dat.documents);

      let code;
      const nameCapitalizaed = FormatterData.capitalizeText(dat.name);

      if (this.args.generateInterfaces) {
        code = `const ${nameCapitalizaed} :  I${dat.name}[] = ${javascriptCode};\n`;
      } else code = `const ${nameCapitalizaed} = ${javascriptCode};`;

      allCode += code;
    }

    const fileName = this.generateFileName();

    await fs.promises.writeFile(
      this.generatePublicRoute(fileName),
      allCode,
      "utf8"
    );

    return fileName;
  }

  private generateDatasetInterface(dat: ReturnDataset): string {
    let returnString = `interface I${FormatterData.capitalizeText(
      dat.name
    )}{\n`;

    const keys = Object.keys(dat.documents[0]);

    for (let i = 0; i < keys.length; i++) {
      let objectI = `${keys[i]}: ${this.generateKeyInterface(
        keys[i],
        dat.documents
      )}`;

      if (i < keys.length - 1) {
        returnString += `${objectI};`;
      } else {
        returnString += `${objectI}`;
      }
    }

    returnString += `}\n`;

    return returnString;
  }

  private generateKeyInterface(key: string, documents: any[]): string {
    let allValouesOfKey = this.getAllValuesOfKey(key, documents);

    return this.generateArrayInterface(allValouesOfKey);
  }
  private getAllValuesOfKey(key: string, documents: any[]): any[] {
    let returnArray: any[] = [];

    for (const doc of documents) {
      returnArray.push(doc[key]);
    }

    return returnArray;
  }

  private getInterfaceByValue(value: any): string {
    let returnValue = "undefined";

    if (typeof value == "string") {
      returnValue = "string";
    } else if (typeof value == "number") returnValue = "number";
    else if (typeof value == "boolean") returnValue = "boolean";
    else if (value === null) returnValue = "null";
    else if (typeof value == "object") {
      if (Array.isArray(value)) {
        returnValue = this.generateArrayInterface(value);
      }
    }

    return returnValue;
  }

  private generateArrayInterface(array: any[]): string {
    let allValuesInterfaces: string[] = [];

    for (const val of array) {
      const valInterface = this.getInterfaceByValue(val);

      const foundValue = allValuesInterfaces.find((el) => el === valInterface);

      if (!foundValue) {
        allValuesInterfaces.push(valInterface);
      }
    }

    return this.getInterfaceByArray(allValuesInterfaces);
  }

  private getInterfaceByArray(array: string[]): string {
    let returnString = ``;

    if (array.length > 1) {
      for (let i = 0; i < array.length; i++) {
        if (i < array.length - 1) {
          returnString += `${array[i]} | `;
        } else {
          returnString += `${array[i]}`;
        }
      }

      returnString += "[]";
    } else returnString = array[0];

    return returnString;
  }
}
