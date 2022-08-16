export interface InitialOptionSchema {
  parent: string;
  fields: TypeOptionSchema[];
}

export interface TypeOptionSchema {
  name: string;
  arguments?: TypeOptionArgument[];
  exampleValue: any;
  getValue(args: any): any;
}

export interface TypeOptionArgument {
  argument: string;
  inputType: INPUT_ARGUMENT_TYPE;
  selectValues?: string[];
}

export enum INPUT_ARGUMENT_TYPE {
  SELECT = "SELECT",
  NUMBER = "NUMBER",
  TEXT = "TEXT",
  DATE = "DATE",
  FLOAT = "FLOAT",
  BOOLEAN = "BOOLEAN",
}
