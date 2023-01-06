import { CODE_TYPES, DATA_TYPES } from "../../shared/constants/Types.enum";
import { InputDatasetField } from "./datasets.interface";

export type FieldDataType =
  | CustomDataType
  | MixedDataType
  | SingleValueDataType
  | RefDataType;

export type InputArguments = { [key: string]: string | boolean | number };

export interface TypeSchema {
  parent: string;
  type: string;
  args: InputArguments;
}

export type RefDataType = {
  type: DATA_TYPES.REF;
  ref: string[];
};

export type SingleValueDataType = {
  type: DATA_TYPES.SINGLE_VALUE;
  fieldType: TypeSchema;
};

export type MixedDataType = {
  type: DATA_TYPES.MIXED;
  object: InputDatasetField<SingleValueDataType>[];
};

export type CustomDataType = {
  type: DATA_TYPES.CUSTOM;
  code: string;
  codeType: CODE_TYPES;
};
