export interface ConfigSchema {
  fileType: FILE_TYPE;
  saveSchema: boolean;
}

export enum FILE_TYPE {
  JSON = "JSON",
  CSV = "CSV",
}
