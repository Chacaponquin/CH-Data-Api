import { OptionSchema } from "../interfaces/fields.interface";
import { schemas } from "chaca";

export const IdOptions: OptionSchema[] = [
  {
    name: "MongoDB ID",
    exampleValue: schemas.id.mongodbID().getValue(),
    getValue: schemas.id.mongodbID().getValue,
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    name: "Number Row",
    exampleValue: schemas.id.numberRow().getValue(),
    getValue: schemas.id.numberRow().getValue,
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    name: "UUID",
    exampleValue: schemas.id.uuid().getValue(),
    getValue: schemas.id.uuid().getValue,
    arguments: [],
    description: { en: "", es: "" },
  },
];
