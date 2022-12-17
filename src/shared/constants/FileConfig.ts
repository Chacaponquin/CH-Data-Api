import { ARGUMENT_TYPE } from "../interfaces/fieldsTypes.enum";
import { FileOption } from "../interfaces/config.interface";
import { FILE_TYPE } from "./Types.enum";

export const FileConfig: FileOption[] = [
  {
    fileType: FILE_TYPE.JSON,
    arguments: [
      {
        argument: "data_schema",
        inputType: ARGUMENT_TYPE.SELECT,
        selectValues: ["Object", "Array"],
      },
      { argument: "separate_datasets", inputType: ARGUMENT_TYPE.BOOLEAN },
    ],
  },
  { fileType: FILE_TYPE.CSV, arguments: [] },
  {
    fileType: FILE_TYPE.JAVASCRIPT,
    arguments: [],
  },
  {
    fileType: FILE_TYPE.TYPESCRIPT,
    arguments: [],
  },
  { fileType: FILE_TYPE.JAVA, arguments: [] },
];
