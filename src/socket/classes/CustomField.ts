import { ReturnValue } from "../../shared/interfaces/fields.interface";
import {
  DatasetField,
  IFieldTransform,
} from "../interfaces/datasets.interface";
import { CustomDataType } from "../interfaces/dataType.interface";

export class CustomField implements IFieldTransform<CustomDataType> {
  public dataPending: DatasetField<CustomDataType>;
  public id: string;
  private value: ReturnValue;

  constructor(id: string, data: DatasetField<CustomDataType>) {
    this.dataPending = data;
    this.id = id;
    this.value = null;
  }

  public getValue(): ReturnValue {
    return this.value;
  }

  public setValue(value: ReturnValue): void {
    this.value = value;
  }

  public getFieldSchema(): DatasetField<CustomDataType> {
    return this.dataPending;
  }

  public setFieldSchema(field: DatasetField<CustomDataType>) {
    this.dataPending = field;
  }
}
