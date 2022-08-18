import { ARGUMENT_TYPE } from "./fieldsTypes.enum";

export interface ArgumentSchema {
  argument: string;
  inputType: ARGUMENT_TYPE;
  selectValues?: string[];
}
