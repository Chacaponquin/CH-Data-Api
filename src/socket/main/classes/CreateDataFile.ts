import {
  InputConfigSchema,
  FILE_TYPE,
} from "../../../shared/interfaces/config.interface";
import fs from "fs";
import { ReturnDataset } from "../interfaces/datasets.interface";
import { InvalidConfig } from "../errors/InvalidConfig";
import { Parser } from "json2csv";
import AdminZim from "adm-zip";
import path from "path";
import { InvalidFileTypeError } from "../errors/InvalidFileTypeError";
import { CodeGenerator } from "../../../shared/classes/CodeGenerator/CodeGenerator";

export class CreateDataFile {
  private data: ReturnDataset[] = [];
  private config: InputConfigSchema;

  constructor(data: any[], config: InputConfigSchema) {
    if (!config) throw new InvalidConfig();
    else this.config = config;

    this.data = data;
  }

  public async generateFile(): Promise<string> {
    const fileType = this.config.file.fileType;

    if (fileType === FILE_TYPE.JSON) return await this.generateJSONFile();
    else if (fileType === FILE_TYPE.CSV) return await this.generateCSV();
    else if (fileType === FILE_TYPE.JAVASCRIPT)
      return await this.generateCodeFile();
    else throw new InvalidFileTypeError();
  }

  private async generateCodeFile(): Promise<string> {
    const generator = new CodeGenerator(this.data, this.config.file);
    const fileURL = await generator.generateFile();
    return fileURL;
  }

  public async generateCSV(): Promise<string> {
    const json2csvParser = new Parser();

    let csvs = [];

    for (const dat of this.data) {
      const csv = json2csvParser.parse(dat.documents);
      csvs.push(csv);
    }

    let allNames: string[] = [];

    for (let i = 0; i < csvs.length; i++) {
      const fileName = `data${Date.now() + i}.csv`;
      await fs.promises.writeFile(`./public/${fileName}`, csvs[i], "utf8");
      allNames.push(fileName);
    }

    return this.generateZipFile(allNames);
  }

  public async generateJSONFile(): Promise<string> {
    const jsonContent = JSON.stringify(this.data);

    const fieldName = `data${Date.now()}.json`;

    await fs.promises.writeFile(`./public/${fieldName}`, jsonContent, "utf8");

    return `util/downloadData/${fieldName}`;
  }

  public generateZipFile(filesNames: string[]) {
    const zp = new AdminZim();
    const zipName = `data${Date.now()}.zip`;
    const zipPath = `./public/${zipName}`;

    for (const file of filesNames)
      zp.addLocalFile(path.join(__dirname, "../../../../public", file));

    zp.writeZip(zipPath);

    return `util/downloadData/${zipName}`;
  }
}
