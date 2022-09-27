import { InputConfigSchema } from "../../shared/interfaces/config.interface";
import { ReturnDataset } from "../interfaces/datasets.interface";
import { InvalidConfig } from "../errors/InvalidConfig";
import { InvalidFileTypeError } from "../errors/InvalidFileTypeError";
import { JavascriptGenerator } from "../../shared/classes/CodeGenerator/JavascriptGenerator";
import { TypescriptGenerator } from "../../shared/classes/CodeGenerator/TypescriptGenerator";
import { Generator } from "../../shared/classes/Generator";
import { JSONGenerator } from "../../shared/classes/JSONGenerator";
import { CSVGenerator } from "../../shared/classes/CSVGenerator";
import { JavaGenerator } from "../../shared/classes/CodeGenerator/JavaGenerator";
import { FILE_TYPE } from "../../shared/helpers/constants/types.enum";
import { ReturnValue } from "../../shared/interfaces/fields.interface";

export class CreateDataFile {
  private data: ReturnDataset<ReturnValue>[] = [];
  private config: InputConfigSchema;

  constructor(data: ReturnDataset<ReturnValue>[], config: InputConfigSchema) {
    if (!config) throw new InvalidConfig();
    else this.config = config;

    this.data = data;
  }

  public async generateFile(): Promise<string> {
    const fileType = this.config.file.fileType as FILE_TYPE;
    const args = this.config.file.arguments || {};

    let generator: Generator;

    switch (fileType) {
      case FILE_TYPE.JSON: {
        generator = new JSONGenerator(this.data, args);
        break;
      }
      case FILE_TYPE.JAVASCRIPT: {
        generator = new JavascriptGenerator(this.data, args);
        break;
      }
      case FILE_TYPE.TYPESCRIPT: {
        generator = new TypescriptGenerator(this.data, args);
        break;
      }
      case FILE_TYPE.CSV: {
        generator = new CSVGenerator(this.data, args);
        break;
      }
      case FILE_TYPE.JAVA: {
        generator = new JavaGenerator(this.data, args);
        break;
      }
      default:
        throw new InvalidFileTypeError();
    }

    return await generator.generateDownRoute();
  }
}
