import {
  InputDatasetField,
  IFieldTransform,
} from "../interfaces/datasets.interface";
import { RefDataType } from "../interfaces/dataType.interface";

export class RefField implements IFieldTransform {
  public dataPending: InputDatasetField<RefDataType>;
  public id: string;
  public pending: boolean;
  private value: any;

  constructor(data: InputDatasetField<RefDataType>, id: string) {
    this.dataPending = data;
    this.id = id;
    this.pending = false;
    this.value = false;
  }

  public isPending(): boolean {
    return this.pending;
  }

  public setPending(value: boolean): void {
    this.pending = value;
  }

  public getValue(): any {
    return this.value;
  }

  public setValue(value: any): void {
    this.value = value;
  }

  public getFieldSchema(): InputDatasetField<RefDataType> {
    return this.dataPending;
  }

  public setFieldSchema(field: InputDatasetField<RefDataType>) {
    this.dataPending = field;
  }
}
