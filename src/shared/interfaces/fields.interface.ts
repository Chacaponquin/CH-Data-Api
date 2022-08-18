import { ArgumentSchema } from "./dataArgument.interface";

export interface InitialOptionSchema {
  parent: string;
  fields: TypeOptionSchema[];
}

export interface ApiParentData extends InitialOptionSchema {
  fields: ApiFieldSchema[];
}

export interface TypeOptionSchema {
  name: string;
  arguments: ArgumentSchema[];
  exampleValue: any;
  getValue(args: any): any;
}

export interface ApiFieldSchema extends TypeOptionSchema {
  route: string;
}
