import { ReturnDataset } from "../../../../socket/main/interfaces/datasets.interface";

export abstract class Generator {
  protected data: ReturnDataset[] = [];
  constructor(datasets: ReturnDataset[]) {
    this.data = datasets;
  }

  public abstract generateCode(): Promise<string>;
}
