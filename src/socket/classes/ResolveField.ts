import { ReturnValue } from "../../shared/interfaces/fields.interface";
import {
  DatasetField,
  IFieldTransform,
} from "../interfaces/datasets.interface";

export class ResolveField implements IFieldTransform {
  public id: string;
  private value: ReturnValue;
  private dataPending: DatasetField;

  constructor(id: string, value: ReturnValue, field: DatasetField) {
    this.id = id;
    this.value = value;
    this.dataPending = field;
  }

  public getValue(): ReturnValue {
    return this.value;
  }

  public setValue(value: ReturnValue): void {
    this.value = value;
  }

  public getFieldSchema(): DatasetField {
    return this.dataPending;
  }

  public setFieldSchema(field: DatasetField) {
    this.dataPending = field;
  }
}
