import { ArgumentSchema } from "./dataArgument.interface";

export interface InputConfigSchema {
  file: InputFileTypeConfig;
  saveSchema: boolean;
}

export interface InputFileTypeConfig {
  fileType: FILE_TYPE;
  arguments: any;
}

export interface FileOption {
  fileType: FILE_TYPE;
  arguments: ArgumentSchema[];
}

export enum FILE_TYPE {
  JSON = "JSON",
  CSV = "CSV",
  JAVASCRIPT = "JAVASCRIPT",
  TYPESCRIPT = "TYPESCRIPT",
}
