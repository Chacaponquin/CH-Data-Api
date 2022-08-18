import { InvalidFileTypeError } from "../../../socket/main/errors/InvalidFileTypeError";
import { ReturnDataset } from "../../../socket/main/interfaces/datasets.interface";
import {
  FILE_TYPE,
  InputFileTypeConfig,
} from "../../interfaces/config.interface";
import { Generator } from "./generators/Generator";
import { JavascriptGenerator } from "./generators/JavascriptGenerator";

export class CodeGenerator {
  private data: ReturnDataset[];
  private fileConfig: InputFileTypeConfig;

  constructor(datasets: ReturnDataset[], fileConfig: InputFileTypeConfig) {
    this.data = datasets;
    this.fileConfig = fileConfig;
  }

  public async generateFile(): Promise<string> {
    let generator: Generator;

    if (this.fileConfig.fileType === FILE_TYPE.JAVASCRIPT) {
      generator = new JavascriptGenerator(this.data);
    } else throw new InvalidFileTypeError();

    const fileURL = await generator.generateCode();

    return fileURL;
  }
}
