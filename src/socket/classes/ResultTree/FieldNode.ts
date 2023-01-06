export abstract class FieldNode {
  constructor(public readonly id: string, public readonly name: string) {}

  public abstract getValue(): unknown;
  public abstract getValueByLocation(location: string[]): unknown;
}
