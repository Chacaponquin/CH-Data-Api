import { ARGUMENT_TYPE } from "./fieldsTypes.enum";

export type ArgumentSchema = {
  argument: string;
  inputType: ARGUMENT_TYPE;
  selectValues?: string[];
  description: ApiDescription;
};

export interface ApiOption {
  parent: string;
  options: OptionWithRoute[];
}

export interface OptionWithRoute extends OptionSchema {
  route: string;
}

export interface OptionSchema<Z = unknown, T = any> {
  name: string;
  arguments: ArgumentSchema[];
  exampleValue: Z;
  description: ApiDescription;
  getValue: (args: T) => Z;
}

export interface ApiDescription {
  es: string;
  en: string;
}
