import { ARGUMENT_TYPE } from "./fieldsTypes.enum";

export type ArgumentSchema = {
  argument: string;
  inputType: ARGUMENT_TYPE;
  selectValues?: string[];
};
