import {
  InputConfigSchema,
  FILE_TYPE,
} from "../../../shared/interfaces/config.interface";
import { ReturnDataset } from "../interfaces/datasets.interface";
import { InvalidConfig } from "../errors/InvalidConfig";
import { InvalidFileTypeError } from "../errors/InvalidFileTypeError";
import { JavascriptGenerator } from "../../../shared/classes/CodeGenerator/JavascriptGenerator";
import { TypescriptGenerator } from "../../../shared/classes/CodeGenerator/TypescriptGenerator";
import { Generator } from "../../../shared/classes/Generator";
import { JSONGenerator } from "../../../shared/classes/JSONGenerator";
import { CSVGenerator } from "../../../shared/classes/CSVGenerator";

export class CreateDataFile {
  private data: ReturnDataset[] = [];
  private config: InputConfigSchema;

  constructor(data: any[], config: InputConfigSchema) {
    if (!config) throw new InvalidConfig();
    else this.config = config;

    this.data = data;
  }

  public async generateFile(): Promise<string> {
    const fileType = this.config.file.fileType as FILE_TYPE;
    const args = this.config.file.arguments;

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
        generator = new CSVGenerator(this.data, args, "csv");
        break;
      }
      default:
        throw new InvalidFileTypeError();
    }

    return await generator.generateDownRoute();
  }
}
