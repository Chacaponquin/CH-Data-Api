import { ReturnDataset } from "../../../socket/main/interfaces/datasets.interface";

export abstract class Generator {
  protected data: ReturnDataset[] = [];
  protected args: any = {};
  constructor(datasets: ReturnDataset[], args: any) {
    this.data = datasets;
    this.args = args;
  }

  public abstract generateCode(): Promise<string>;
}
