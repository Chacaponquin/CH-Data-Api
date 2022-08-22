import { ArgumentSchema } from "./dataArgument.interface";

export interface InitialOptionSchema {
  parent: string;
  fields: TypeOptionSchema[];
}

export interface FieldArgumentSchema extends ArgumentSchema {
  description: string;
}

export interface ApiParentData extends InitialOptionSchema {
  fields: ApiFieldSchema[];
}

export interface TypeOptionSchema {
  name: string;
  arguments: FieldArgumentSchema[];
  exampleValue: any;
  getValue(args: any): any;
}

export interface ApiFieldSchema extends TypeOptionSchema {
  route: string;
}
