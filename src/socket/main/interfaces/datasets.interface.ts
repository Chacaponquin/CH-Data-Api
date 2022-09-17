export interface ReturnDataset {
  name: string;
  documents: { [path: string]: any }[];
}

export interface Dataset {
  name: string;
  id: number;
  limit: number;
  fields: DatasetField[];
}

export interface DatasetField {
  name: string;
  id: number;
  dataType: MixedDataType | RefDataType | SingleValueDataType | CustomDataType;
  isPosibleNull: boolean;
  isArray: {
    min: number;
    max: number;
  };
}

export interface TypeSchema {
  parent: string;
  type: string;
  args: any;
}

interface DataTypeSchema {
  type: DATA_TYPES;
}

interface MixedDataType extends DataTypeSchema {}

export interface RefDataType extends DataTypeSchema {
  ref: string;
  fieldRef: string;
}

export interface SingleValueDataType extends DataTypeSchema {
  fieldType: TypeSchema;
}

export interface CustomDataType extends DataTypeSchema {
  code: string;
  codeType: CODE_TYPES;
}

export enum DATA_TYPES {
  SINGLE_VALUE = "SINGLE_VALUE",
  MIXED = "MIXED",
  REF = "REF",
  CUSTOM = "CUSTOM",
}

export enum CODE_TYPES {
  JAVASCRIPT = "JAVASCRIPT",
  PYTHON = "PYTHON",
}
