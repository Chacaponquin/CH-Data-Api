import { ReturnDataset } from "../../../socket/interfaces/datasets.interface";
import { FormatterData } from "../FormatterData";
import { CodeGenerator } from "./CodeGenerator";
import fs from "fs";
import { ConfigFileArgument } from "../../interfaces/config.interface";
import { ReturnValue } from "../../interfaces/fields.interface";

export class JavaGenerator extends CodeGenerator {
  private classesCreated: string[] = [];

  constructor(
    datasets: ReturnDataset<ReturnValue>[],
    args: { [path: string]: ConfigFileArgument }
  ) {
    super(datasets, args, "java");
  }

  protected async generateCodeFile(): Promise<string> {
    const allClasses: {
      class: string;
      docs: { [path: string]: ReturnValue | ReturnValue[] }[];
    }[] = [];
    for (const dat of this.data) {
      const className: string = await this.generateClass({
        name: FormatterData.capitalizeMayusText(dat.name),
        docExample: dat.documents[0],
      });

      allClasses.push({ class: className, docs: dat.documents });
    }

    const zipFileName = this.generateZipFile([
      ...allClasses.map((el) => `${el.class}.${this.ext}`),
      await this.generateMainFile(
        allClasses.map((el) => {
          return { docs: el.docs, class: el.class };
        })
      ),
    ]);

    return zipFileName;
  }

  private async generateMainFile(
    classes: {
      class: string;
      docs: { [path: string]: ReturnValue | ReturnValue[] }[];
    }[]
  ): Promise<string> {
    const fileName = `${"Main"}.${this.ext}`;

    let classString = "";
    classString += `public class Main {\n`;
    classString += `\tpublic static void main(String[] args){\n`;

    for (const c of classes) {
      const arrayName: string = `${FormatterData.capitalizeText(c.class)}`;
      classString += `\tArrayList< ${c.class} > ${arrayName} =  new ArrayList< ${c.class} >();\n`;

      for (let i = 0; i < c.docs.length; i++) {
        const variableName: string = `${FormatterData.capitalizeText(
          c.class
        )}${i}`;

        classString += `${c.class} ${variableName} = new ${
          c.class
        }(${await this.createParameters(c.docs[i])});\n`;

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

  private generateClassName(docEx: {
    [path: string]: ReturnValue | ReturnValue[];
  }): string {
    let name = `Object`;
    const keys = Object.keys(docEx);
    for (const key of keys) name += key;
    return name;
  }

  private async generateClass({
    name,
    docExample,
  }: {
    name: string;
    docExample: { [path: string]: ReturnValue | ReturnValue[] };
  }): Promise<string> {
    const foundName = this.classesCreated.find((el) => el === name);

    if (!foundName) {
      let classString = "public class ";
      const fileName = `${name}.${this.ext}`;
      classString += name + "{\n";

      const keys = Object.keys(docExample);
      for (const key of keys) {
        classString += `\tprivate ${await this.filterParentType(
          docExample[key]
        )} ${key};\n`;
      }
      classString += await this.generateConstructor(name, docExample);
      classString += "}";

      this.classesCreated.push(name);

      await fs.promises.writeFile(
        this.generatePublicRoute(fileName),
        classString,
        "utf-8"
      );
    }

    return name;
  }

  private createParameters = async (values: {
    [path: string]: ReturnValue | ReturnValue[];
  }): Promise<string> => {
    let returnVal = "";
    const keys = Object.keys(values);

    for (let i = 0; i < keys.length; i++) {
      returnVal +=
        `${await this.filterTypeValue(values[keys[i]])}` +
        (i === keys.length - 1 ? "" : ", ");
    }

    return returnVal;
  };

  private async filterTypeValue(
    value: ReturnValue | ReturnValue[]
  ): Promise<string> {
    let returnString: string = "null";

    if (typeof value === "number") returnString = `${value}`;
    else if (typeof value === "string") returnString = `"${value}"`;
    else if (typeof value === "boolean") returnString = `"${value}"`;
    else if (typeof value === "object") {
      if (Array.isArray(value)) {
        const type = await this.filterParentType(value[0]);

        let params = "";
        for (let i = 0; i < value.length; i++) {
          if (i !== value.length - 1) {
            params += `${await this.filterTypeValue(value[i])}, `;
          } else {
            params += `${await this.filterTypeValue(value[i])}`;
          }
        }

        returnString = `new ArrayList< ${type} >().toArray(new ${type}[]{${params}})`;
      } else if (value === null) returnString = "null";
      else if (value instanceof Date) returnString = `"${value.toString()}"`;
      else {
        const className = await this.generateClass({
          docExample: value,
          name: this.generateClassName(value),
        });

        returnString = `new ${className}(${await this.createParameters(
          value
        )})`;
      }
    }

    return returnString;
  }

  private async filterParentType(
    value: ReturnValue | ReturnValue[]
  ): Promise<string> {
    let returnValue = "Object";

    if (typeof value === "number") {
      if (Number.isInteger(value)) returnValue = "Integer";
      else returnValue = "Float";
    } else if (typeof value === "string") returnValue = "String";
    else if (typeof value === "boolean") returnValue = `boolean`;
    else if (typeof value === "object") {
      if (Array.isArray(value))
        returnValue = `ArrayList< ${await this.filterParentType(value[0])} >`;
      else if (value === null) returnValue = "Object";
      else if (value instanceof Date) returnValue = "String";
      else {
        returnValue += `${this.generateClassName(value)}`;
      }
    }

    return returnValue;
  }

  private async generateConstructor(
    className: string,
    doc: { [path: string]: ReturnValue | ReturnValue[] }
  ): Promise<string> {
    const initializeVar = (): string => {
      let returnVal = "";

      const keys = Object.keys(doc);
      for (let i = 0; i < keys.length; i++) {
        returnVal += `\tthis.${keys[i]} = ${keys[i]};\n`;
      }

      return returnVal;
    };

    const generateConstructorParameters = async (values: {
      [path: string]: ReturnValue | ReturnValue[];
    }): Promise<string> => {
      let returnString = "";
      const keys = Object.keys(values);

      for (let i = 0; i < keys.length; i++) {
        returnString +=
          `${await this.filterParentType(values[keys[i]])} ${keys[i]}` +
          (i === keys.length - 1 ? "" : ", ");
      }

      return returnString;
    };

    let returnString = "";
    returnString += `\tpublic ${className}(${await generateConstructorParameters(
      doc
    )}){\n\t`;
    returnString += `${initializeVar()}`;
    returnString += "\t}\n";

    return returnString;
  }
}
