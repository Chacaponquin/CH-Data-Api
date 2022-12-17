import { FieldDataType } from "./dataType.interface";

export interface ReturnDataset<T> {
  id: string;
  name: string;
  documents: {
    [path: string]: T | T[];
  }[];
}

export interface IFieldTransform<T = FieldDataType> {
  getValue(): any;
  setValue(value: any): void;
  getFieldSchema(): InputDatasetField<T>;
  setFieldSchema(field: InputDatasetField<T>): void;
}

export interface InputDataset {
  name: string;
  id: string;
  limit: number;
  fields: InputDatasetField[];
}

export interface InputDatasetField<T = FieldDataType> {
  name: string;
  id: string;
  dataType: T;
  isPosibleNull: boolean;
  isArray: null | {
    min: number;
    max: number;
  };
}

export interface TypeSchema {
  parent: string;
  type: string;
  args: { [key: string]: string | boolean | number };
}
