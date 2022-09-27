import { ReturnValue } from "../../shared/interfaces/fields.interface";
import { FieldDataType } from "./dataType.interface";

export interface ReturnDataset<T> {
  id: string;
  name: string;
  documents: {
    [path: string]: T | T[];
  }[];
}

export interface IFieldTransform<T = FieldDataType> {
  getValue(): ReturnValue;
  setValue(value: ReturnValue): void;
  getFieldSchema(): DatasetField<T>;
  setFieldSchema(field: DatasetField<T>): void;
}

export interface Dataset {
  name: string;
  id: string;
  limit: number;
  fields: DatasetField[];
}

export interface DatasetField<T = FieldDataType> {
  name: string;
  id: string;
  dataType: T;
  isPosibleNull: boolean;
  isArray:
    | {
        min: number;
        max: number;
      }
    | false;
}

export interface TypeSchema {
  parent: string;
  type: string;
  args: { [key: string]: string | boolean | number };
}
