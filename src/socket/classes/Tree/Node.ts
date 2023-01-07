import { InputFieldIsArray } from "../../interfaces/datasets.interface";

export interface NodeConfig {
  id: string;
  name: string;
  isArray: InputFieldIsArray;
  isPosibleNull: number;
}

export abstract class Node {
  constructor(private readonly config: NodeConfig) {}

  get name() {
    return this.config.name;
  }

  get id() {
    return this.config.id;
  }

  get isArray() {
    return this.config.isArray;
  }

  get isPosibleNull() {
    return this.config.isPosibleNull;
  }

  get fieldConfig() {
    return { id: this.id, isPosibleNull: this.isPosibleNull, name: this.name };
  }
}
