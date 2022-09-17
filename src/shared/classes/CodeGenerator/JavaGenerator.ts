import { ReturnDataset } from "../../../socket/main/interfaces/datasets.interface";
import { FormatterData } from "../FormatterData";
import { CodeGenerator } from "./CodeGenerator";
import fs from "fs";

export class JavaGenerator extends CodeGenerator {
  constructor(
    datasets: ReturnDataset[],
    args: { [path: string]: string | boolean }
  ) {
    super(datasets, args, "java");
  }

  protected async generateCodeFile(): Promise<string> {
    const allClasses: { class: string; docs: { [path: string]: any }[] }[] = [];
    for (const dat of this.data) {
      const className: string = await this.generateClass(dat);

      allClasses.push({ class: className, docs: dat.documents });
    }

    const zipFileName = this.generateZipFile([
      ...allClasses.map((el) => el.class),
      await this.generateMainFile(
        allClasses.map((el) => {
          return { docs: el.docs, class: el.class.split(".")[0] };
        })
      ),
    ]);

    return zipFileName;
  }

  private async generateMainFile(
    classes: { class: string; docs: { [path: string]: any }[] }[]
  ): Promise<string> {
    const createParameters = (values: { [path: string]: any }): string => {
      let returnVal = "";
      const keys = Object.keys(values);

      for (let i = 0; i < keys.length; i++) {
        returnVal +=
          `${this.filterTypeValue(values[keys[i]])}` +
          (i === keys.length - 1 ? "" : ", ");
      }

      return returnVal;
    };

    const fileName = `${"Main"}.${this.ext}`;

    let classString = "";
    classString += `public class Main {\n`;
    classString += `\tpublic static void initialize(){\n`;

    for (const c of classes) {
      const arrayName: string = `${FormatterData.capitalizeText(c.class)}`;
      classString += `\tArrayList< ${c.class} > ${arrayName} =  new ArrayList< ${c.class} >();\n`;

      for (let i = 0; i < c.docs.length; i++) {
        const variableName: string = `${FormatterData.capitalizeText(
          c.class
        )}${i}`;

        classString += `${c.class} ${variableName} = new ${
          c.class
        }(${createParameters(c.docs[i])});\n`;

        classString += `${arrayName}.add(${variableName});\n`;
      }
    }

    classString += "}\n";
    classString += "}";

    await fs.promises.writeFile(
      this.generatePublicRoute(fileName),
      classString,
      "utf-8"
    );

    return fileName;
  }

  private async generateClass(dat: ReturnDataset): Promise<string> {
    let classString = "public class ";

    const className = FormatterData.capitalizeMayusText(dat.name);
    const fileName = `${className}.${this.ext}`;

    classString += className + "{\n";

    const doc = dat.documents[0];
    const keys = Object.keys(doc);

    for (const key of keys) {
      classString += `\tprivate ${this.filterParentType(doc[key])} ${key};\n`;
    }
    classString += this.generateConstructor(className, doc);
    classString += "}";

    await fs.promises.writeFile(
      this.generatePublicRoute(fileName),
      classString,
      "utf-8"
    );

    return fileName;
  }

  private filterTypeValue(value: any): string {
    let returnString: any = "null";

    if (typeof value === "number") returnString = value;
    else if (typeof value === "string") returnString = `"${value}"`;
    else if (typeof value === "boolean") returnString = `"${value}"`;
    else if (typeof value === "object") {
      if (Array.isArray(value)) {
        returnString = `new ArrayList`;
      }
    }

    return returnString;
  }

  private filterParentType(value: any): string {
    let returnValue = "null";

    if (typeof value === "number") {
      if (Number.isInteger(value)) returnValue = "int";
      else returnValue = "float";
    } else if (typeof value === "string") returnValue = "String";
    else if (typeof value === "boolean") returnValue = `boolean`;
    else if (typeof value === "object") {
      returnValue = `ArrayList< ${this.filterParentType(value[0])} >`;
    }

    return returnValue;
  }

  private generateConstructor(
    className: string,
    doc: { [path: string]: any }
  ): string {
    const initializeVar = (): string => {
      let returnVal = "";

      const keys = Object.keys(doc);
      for (let i = 0; i < keys.length; i++) {
        returnVal += `\tthis.${keys[i]} = ${keys[i]};\n`;
      }

      return returnVal;
    };

    const generateConstructorParameters = (values: {
      [path: string]: any;
    }): string => {
      let returnString = "";
      const keys = Object.keys(values);

      for (let i = 0; i < keys.length; i++) {
        returnString +=
          `${this.filterParentType(values[keys[i]])} ${keys[i]}` +
          (i === keys.length - 1 ? "" : ", ");
      }

      return returnString;
    };

    let returnString = "";
    returnString += `\tpublic ${className}(${generateConstructorParameters(
      doc
    )}){\n\t`;
    returnString += `${initializeVar()}`;
    returnString += "\t}\n";

    return returnString;
  }
}
