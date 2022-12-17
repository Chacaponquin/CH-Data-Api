import { schemas } from "chaca";
import { OptionSchema } from "../interfaces/fields.interface";

export const SystemOptions: OptionSchema[] = [
  {
    exampleValue: schemas.system.fileExt(),
    getValue: schemas.system.fileExt().getValue,
    name: "File Extension",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.system.fileName().getValue(),
    getValue: schemas.system.fileName().getValue,
    name: "File Name",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.system.filePath().getValue(),
    getValue: schemas.system.filePath().getValue,
    name: "File Path",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.system.directoryPath().getValue(),
    getValue: schemas.system.directoryPath().getValue,
    name: "Directory Path",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.system.filePath().getValue(),
    getValue: schemas.system.filePath().getValue,
    name: "File Path",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.system.mimeType().getValue(),
    getValue: schemas.system.mimeType().getValue,
    name: "Mime Type",
    arguments: [],
    description: { en: "", es: "" },
  },
];
