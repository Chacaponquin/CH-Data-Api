import {
  InputDatasetField,
  IFieldTransform,
} from "../interfaces/datasets.interface";

export class ResolveField implements IFieldTransform {
  public id: string;
  private value: any;
  private dataPending: InputDatasetField;

  constructor(id: string, value: any, field: InputDatasetField) {
    this.id = id;
    this.value = value;
    this.dataPending = field;
  }

  public getValue(): any {
    return this.value;
  }

  public setValue(value: any): void {
    this.value = value;
  }

  public getFieldSchema(): InputDatasetField {
    return this.dataPending;
  }

  public setFieldSchema(field: InputDatasetField) {
    this.dataPending = field;
  }
}
