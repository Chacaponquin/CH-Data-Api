import { FieldNode } from "./FieldNode";

export class ResultFieldNode extends FieldNode {
  private value: unknown | unknown[];

  constructor(id: string, name: string, value: unknown) {
    super(id, name);
    this.value = value;
  }

  public getValueByLocation(location: string[]): unknown {
    if (location.length === 0) return this.getValue();
    else return undefined;
  }

  public getValue(): unknown {
    return this.value;
  }
}
