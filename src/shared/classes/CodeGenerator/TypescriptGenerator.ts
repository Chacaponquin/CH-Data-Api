import { CodeGenerator } from "./CodeGenerator";
import { JavascriptGenerator } from "./JavascriptGenerator";
import fs from "fs";
import { FormatterData } from "../FormatterData";
import { ReturnDataset } from "../../../socket/interfaces/datasets.interface";
import { ConfigFileArgument } from "../../interfaces/config.interface";
import { ReturnValue } from "../../interfaces/fields.interface";
import { v4 as uuid } from "uuid";

export class TypescriptGenerator extends CodeGenerator {
  private interfacesCode: string = "";
  private interfacesCreated: string[] = [];

  constructor(
    datasets: ReturnDataset<ReturnValue>[],
    args: { [path: string]: ConfigFileArgument }
  ) {
    super(datasets, args, "ts");
  }

  protected async generateCodeFile(): Promise<string> {
    let allCode: string = ``;

    for (const dat of this.data) {
      const javascriptCode = new JavascriptGenerator(
        this.data,
        {}
      ).generateDatasetArray(dat.documents);

      let code;
      const nameCapitalizaed = FormatterData.capitalizeText(dat.name);

      if (this.args.generate_interfaces) {
        code = `const ${nameCapitalizaed} :  ${this.generateDatasetInterface(
          dat
        )}[] = ${javascriptCode};\n`;
      } else code = `const ${nameCapitalizaed} = ${javascriptCode};`;

      allCode += code;
    }

    const fileName = this.generateFileName();

    await fs.promises.writeFile(
      this.generatePublicRoute(fileName),
      this.interfacesCode + allCode,
      "utf8"
    );

    return fileName;
  }

  private generateDatasetInterface(dat: ReturnDataset<ReturnValue>): string {
    let interfaceName = `I${FormatterData.capitalizeMayusText(dat.name)}`;
    let interfaceCode = `interface ${interfaceName}{\n`;

    for (const key of Object.keys(dat.documents[0])) {
      const allValues: (ReturnValue | ReturnValue[])[] = dat.documents.map(
        (el) => {
          return el[key];
        }
      );

      let retInt: string[] = [];
      for (const val of allValues) {
        if (Array.isArray(val)) {
          retInt.push(this.generateArrayInterface(val));
        } else {
          retInt.push(this.generateInterfaceByValue(val));
        }
      }

      let uniqueInt = new Set(retInt);
      const uniqueValues: string[] = [];
      uniqueInt.forEach((el) => uniqueValues.push(el));
      let keyInterface: string;

      if (uniqueValues.length <= 1) keyInterface = `${uniqueValues[0]}`;
      else {
        let str = "(";
        for (let i = 0; i < uniqueValues.length; i++) {
          if (i !== uniqueValues.length - 1) str += `${uniqueValues[i]} |`;
          else str += `${uniqueValues[i]}`;
        }
        str += ")";
        keyInterface = str;
      }

      interfaceCode += `${key}: ${keyInterface};`;
    }

    interfaceCode += "}\n";
    this.interfacesCode += interfaceCode;
    return interfaceName;
  }

  private generateObjectInterface(
    interfaceName: string,
    doc: {
      [path: string]: ReturnValue | ReturnValue[];
    }
  ): string {
    const foundInterface = this.interfacesCreated.find(
      (el) => el === interfaceName
    );

    if (!foundInterface) {
      let interfaceCode = `interface ${interfaceName}{\n\t`;
      for (const [key, value] of Object.entries(doc)) {
        interfaceCode += `${key}: ${this.generateInterfaceByValue(value)};`;
      }
      interfaceCode += "}\n";

      this.interfacesCode += interfaceCode;

      this.interfacesCreated.push(interfaceName);
    }

    return interfaceName;
  }

  private generateInterfaceByValue(value: ReturnValue | ReturnValue[]): string {
    let returnValue = "undefined";

    if (typeof value == "string") {
      returnValue = "string";
    } else if (typeof value === "number") returnValue = "number";
    else if (typeof value === "boolean") returnValue = "boolean";
    else if (value === null) returnValue = "null";
    else if (typeof value == "object") {
      if (Array.isArray(value)) {
        returnValue = this.generateArrayInterface(value);
      } else if (value instanceof Date) returnValue = "Date";
      else {
        let objectName = "";
        Object.keys(value).forEach((el) => {
          objectName += el;
        });
        returnValue = this.generateObjectInterface(
          `Object${objectName}`,
          value
        );
      }
    }

    return returnValue;
  }

  private generateArrayInterface(array: ReturnValue[]): string {
    let interfaceCode = ``;

    const allTypes = array.map((el) => this.generateInterfaceByValue(el));
    const uniqueTypes = new Set(allTypes);

    if (uniqueTypes.size <= 1) {
      interfaceCode += `${allTypes[0]}`;
    } else {
      const unique: string[] = [];
      uniqueTypes.forEach((el) => unique.push(el));

      let str = "(";
      for (let i = 0; i < unique.length; i++) {
        if (i !== unique.length - 1) {
          str += `${unique[i]} |`;
        } else {
          str += `${unique[i]}`;
        }
      }
      str += ")";

      interfaceCode += `${str}`;
    }

    interfaceCode += `[]`;

    return interfaceCode;
  }
}
