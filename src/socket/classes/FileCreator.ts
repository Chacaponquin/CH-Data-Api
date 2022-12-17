import { InputConfigSchema } from "../../shared/interfaces/config.interface";
import { ReturnDataset } from "../interfaces/datasets.interface";
import { FILE_TYPE } from "../../shared/constants/Types.enum";
import { chaca, schemas } from "chaca";
import { ChacaFileError } from "../errors/ChacaFileError";
import AdmZip from "adm-zip";

export class FileCreator {
  private PUBLIC_ROUTE = "../../../public/";

  constructor(
    private readonly data: ReturnDataset<any>[],
    private readonly config: InputConfigSchema
  ) {
    if (!config)
      throw new ChacaFileError(`You must pass a config object for the file`);
  }

  public async generateFile(): Promise<string> {
    const fileType = this.config.file.fileType as FILE_TYPE;
    const args = this.config.file.arguments || {};

    if (Object.values(FILE_TYPE).includes(fileType)) {
      const allRoutes = [] as string[];

      for (const dat of this.data) {
        const route = await chaca.export(dat.documents, {
          fileName: chaca.utils.capitalizeText(dat.name),
          format: fileType,
          location: this.PUBLIC_ROUTE,
        });

        allRoutes.push(route);
      }

      return this.createFilesZip(allRoutes);
    } else {
      throw new ChacaFileError(`${fileType} is not a correct file type`);
    }
  }

  private createFilesZip(allRoutes: string[]): string {
    const zp = new AdmZip();
    const zipName = `data${schemas.id.mongodbID().getValue()}.zip`;
    const zipPath = `${this.PUBLIC_ROUTE}${zipName}`;

    for (const r of allRoutes) zp.addLocalFile(r);

    zp.writeZip(zipPath);

    return zipPath;
  }
}
