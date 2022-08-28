import { Generator } from "./Generator";
import fs from "fs";
import { Parser } from "json2csv";

export class CSVGenerator extends Generator {
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
