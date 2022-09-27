import { ArgumentSchema } from "./dataArgument.interface";

export interface InitialOptionSchema {
  parent: string;
  fields: TypeOptionSchema[];
}

export interface FieldArgumentSchema extends ArgumentSchema {
  description: string;
}

export interface TypeOptionSchema {
  name: string;
  arguments: FieldArgumentSchema[];
  exampleValue: ReturnValue;
  getValue(args: { [key: string]: FieldArgument }): ReturnValue;
}

export type ReturnValue =
  | string
  | boolean
  | number
  | { [path: string]: ReturnValue }
  | Date
  | number[][]
  | string[]
  | null
  | number[];

export type FieldArgument =
  | string
  | number
  | Date
  | string[]
  | number[]
  | boolean
  | FieldArgument[];

export interface ApiParentData extends InitialOptionSchema {
  fields: ApiFieldSchema[];
}
export interface ApiFieldSchema extends TypeOptionSchema {
  route: string;
}
