import { Generator } from "./Generator";
import fs from "fs";
import { Parser } from "json2csv";
import { ReturnDataset } from "../../socket/interfaces/datasets.interface";
import { ConfigFileArgument } from "../interfaces/config.interface";
import { ReturnValue } from "../interfaces/fields.interface";

export class CSVGenerator extends Generator {
  constructor(
    data: ReturnDataset<ReturnValue>[],
    args: { [path: string]: ConfigFileArgument }
  ) {
    super(data, "csv", args);
  }

  public async generateFile(): Promise<string> {
    const json2csvParser = new Parser();

    let csvs = [];

    for (const dat of this.data) {
      const csv = json2csvParser.parse(dat.documents);
      csvs.push(csv);
    }

    let allNames: string[] = [];

    for (let i = 0; i < csvs.length; i++) {
      const fileName = this.generateFileName();
      await fs.promises.writeFile(
        this.generatePublicRoute(fileName),
        csvs[i],
        "utf8"
      );
      allNames.push(fileName);
    }

    return this.generateZipFile(allNames);
  }
}
