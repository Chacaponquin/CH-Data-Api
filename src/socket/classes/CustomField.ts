import {
  IFieldTransform,
  InputDatasetField,
} from "../interfaces/datasets.interface";
import { CustomDataType } from "../interfaces/dataType.interface";

export class CustomField implements IFieldTransform<CustomDataType> {
  public dataPending: InputDatasetField<CustomDataType>;
  public id: string;
  private value: any;

  constructor(id: string, data: InputDatasetField<CustomDataType>) {
    this.dataPending = data;
    this.id = id;
    this.value = null;
  }

  public getValue(): any {
    return this.value;
  }

  public setValue(value: any): void {
    this.value = value;
  }

  public getFieldSchema(): InputDatasetField<CustomDataType> {
    return this.dataPending;
  }

  public setFieldSchema(field: InputDatasetField<CustomDataType>) {
    this.dataPending = field;
  }
}
