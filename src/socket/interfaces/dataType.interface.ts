import {
  CODE_TYPES,
  DATA_TYPES,
} from "../../shared/helpers/constants/types.enum";
import { DatasetField, TypeSchema } from "./datasets.interface";

export type FieldDataType =
  | CustomDataType
  | MixedDataType
  | SingleValueDataType
  | RefDataType;

export type RefDataType = {
  type: DATA_TYPES.REF;
  ref: string;
  fieldRef: string;
};
export type SingleValueDataType = {
  type: DATA_TYPES.SINGLE_VALUE;
  fieldType: TypeSchema;
};
export type MixedDataType = {
  type: DATA_TYPES.MIXED;
  object: DatasetField[];
};
export type CustomDataType = {
  type: DATA_TYPES.CUSTOM;
  code: string;
  codeType: CODE_TYPES;
};
