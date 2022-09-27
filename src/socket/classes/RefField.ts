import { ReturnValue } from "../../shared/interfaces/fields.interface";
import {
  DatasetField,
  IFieldTransform,
} from "../interfaces/datasets.interface";
import { RefDataType } from "../interfaces/dataType.interface";

export class RefField implements IFieldTransform {
  public dataPending: DatasetField<RefDataType>;
  public id: string;
  public pending: boolean;
  private value: ReturnValue;

  constructor(data: DatasetField<RefDataType>, id: string) {
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

  public getValue(): ReturnValue {
    return this.value;
  }

  public setValue(value: ReturnValue): void {
    this.value = value;
  }

  public getFieldSchema(): DatasetField<RefDataType> {
    return this.dataPending;
  }

  public setFieldSchema(field: DatasetField<RefDataType>) {
    this.dataPending = field;
  }
}
