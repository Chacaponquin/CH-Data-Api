import { FILE_TYPE } from "../constants/Types.enum";
import { ArgumentSchema } from "./dataArgument.interface";

export interface InputConfigSchema {
  file: InputFileTypeConfig;
  saveSchema: boolean;
}

export interface InputFileTypeConfig {
  fileType: FILE_TYPE;
  arguments: { [path: string]: ConfigFileArgument };
}

export interface FileOption {
  fileType: FILE_TYPE;
  arguments: ArgumentSchema[];
}

export type ConfigFileArgument = string | number | boolean;
