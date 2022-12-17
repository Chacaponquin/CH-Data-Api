import { schemas } from "chaca";
import { OptionSchema } from "../interfaces/fields.interface";

export const PhoneOptions: OptionSchema[] = [
  {
    name: "Number",
    getValue: schemas.phone.number().getValue,
    exampleValue: schemas.phone.number().getValue(),
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    name: "Prefix",
    exampleValue: schemas.phone.prefix().getValue(),
    getValue: schemas.phone.prefix().getValue,
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    arguments: [],
    description: { en: "", es: "" },
    exampleValue: schemas.phone.callDuration(),
    name: "Call Duration",
    getValue: schemas.phone.callDuration().getValue,
  },
];
