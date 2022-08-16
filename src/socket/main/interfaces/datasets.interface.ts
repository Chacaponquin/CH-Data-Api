export interface ReturnDataset {
  name: string;
  documents: any[];
}

export interface Dataset {
  name: string;
  id: number;
  limit: number;
  fields: DatasetField[];
}

export interface DatasetField {
  name: string;
  type: TypeSchema;
  id: number;
  dataType: MixedDataType | RefDataType | ArrayDataType | SingleValueDataType;
  args: FieldArgument[];
  isPosibleNull: boolean;
  isArray: {
    min: number;
    max: number;
  };
}

export interface FieldArgument {
  field: string;
  value: any;
}

export interface TypeSchema {
  parent: string;
  type: string;
}

interface DataTypeSchema {
  type: DATA_TYPES;
}

interface MixedDataType extends DataTypeSchema {}

export interface RefDataType extends DataTypeSchema {
  ref: string;
  fieldRef: string;
}

interface SingleValueDataType extends DataTypeSchema {}
interface ArrayDataType extends DataTypeSchema {
  limit: number;
}

export enum DATA_TYPES {
  SINGLE_VALUE = "SINGLE_VALUE",
  MIXED = "MIXED",
  REF = "REF",
}
