import { ARGUMENT_TYPE } from "../../interfaces/fieldsTypes.enum";
import { FILE_TYPE, FileOption } from "../../interfaces/config.interface";

export const FileConfigSchema: FileOption[] = [
  {
    fileType: FILE_TYPE.JSON,
    arguments: [],
  },
  { fileType: FILE_TYPE.CSV, arguments: [] },
  {
    fileType: FILE_TYPE.JAVASCRIPT,
    arguments: [
      {
        argument: "arquitecture",
        inputType: ARGUMENT_TYPE.SELECT,
        selectValues: ["Classes", "Variables"],
      },
    ],
  },
  {
    fileType: FILE_TYPE.TYPESCRIPT,
    arguments: [
      { argument: "generateInterfaces", inputType: ARGUMENT_TYPE.BOOLEAN },
    ],
  },
];