import { ReturnDataset } from "../../../socket/main/interfaces/datasets.interface";
import { Generator } from "../Generator";

export abstract class CodeGenerator extends Generator {
  constructor(datasets: ReturnDataset[], args: any, extension: string) {
    super(datasets, extension, args);
  }

  protected abstract generateCodeFile(): Promise<string>;

  protected async generateFile(): Promise<string> {
    const fileName = await this.generateCodeFile();
    return fileName;
  }
}
