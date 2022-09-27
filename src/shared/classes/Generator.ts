import { faker } from "@faker-js/faker";
import AdminZim from "adm-zip";
import path from "path";
import { ReturnDataset } from "../../socket/interfaces/datasets.interface";
import { ConfigFileArgument } from "../interfaces/config.interface";
import { ReturnValue } from "../interfaces/fields.interface";

export abstract class Generator {
  protected ext: string;
  protected args: { [path: string]: ConfigFileArgument };
  protected data: ReturnDataset<ReturnValue>[] = [];

  constructor(
    data: ReturnDataset<ReturnValue>[],
    extension: string,
    args: { [path: string]: ConfigFileArgument }
  ) {
    this.ext = extension;
    this.args = args;
    this.data = data;
  }

  protected abstract generateFile(): Promise<string>;

  public async generateDownRoute(): Promise<string> {
    const fileName = await this.generateFile();
    return `util/downloadData/${fileName}`;
  }

  protected generateFileName(): string {
    return `data${faker.database.mongodbObjectId()}.${this.ext}`;
  }

  protected generatePublicRoute(fileName: string): string {
    return `./public/${fileName}`;
  }

  protected generateZipFile(filesNames: string[]): string {
    const zp = new AdminZim();
    const zipName = `data${faker.database.mongodbObjectId()}.zip`;
    const zipPath = this.generatePublicRoute(zipName);

    for (const file of filesNames)
      zp.addLocalFile(path.join(__dirname, "../../../public/", file));

    zp.writeZip(zipPath);

    return zipName;
  }
}
