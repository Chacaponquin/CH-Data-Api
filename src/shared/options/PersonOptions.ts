import { OptionSchema } from "../interfaces/fields.interface";
import { ARGUMENT_TYPE } from "../interfaces/fieldsTypes.enum";
import { schemas } from "chaca";

const SEX_ARGUMENTS = [
  {
    argument: "sex",
    inputType: ARGUMENT_TYPE.SELECT,
    selectValues: ["male", "female"],
    description: { en: "", es: "" },
  },
];

const LANGUAGE_ARGUMENTS = [
  {
    argument: "language",
    inputType: ARGUMENT_TYPE.SELECT,
    description: { en: "", es: "" },
    selectValues: ["en", "es"],
  },
];

const NAME_FIELD_ARGUMENTS = [...SEX_ARGUMENTS, ...LANGUAGE_ARGUMENTS];

export const PersonOptions: OptionSchema[] = [
  {
    name: "Last Name",
    arguments: LANGUAGE_ARGUMENTS,
    exampleValue: schemas.person.lastName().getValue(),
    getValue: schemas.person.lastName().getValue,
    description: { en: "", es: "" },
  },
  {
    name: "Full Name",
    arguments: NAME_FIELD_ARGUMENTS,
    getValue: schemas.person.fullName().getValue,
    description: { en: "", es: "" },
    exampleValue: schemas.person.fullName().getValue(),
  },
  {
    name: "First Name",
    arguments: NAME_FIELD_ARGUMENTS,
    getValue: schemas.person.firstName().getValue,
    exampleValue: schemas.person.firstName().getValue(),
    description: { en: "", es: "" },
  },
  {
    name: "Prefix",
    arguments: SEX_ARGUMENTS,
    getValue: schemas.person.prefix().getValue,
    exampleValue: schemas.person.prefix().getValue(),
    description: { en: "", es: "" },
  },
  {
    name: "Job Area",
    getValue: schemas.person.jobArea().getValue,
    exampleValue: schemas.person.jobArea().getValue(),
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    name: "Job Level",
    getValue: schemas.person.jobLevel().getValue,
    exampleValue: schemas.person.jobLevel().getValue(),
    arguments: [],
    description: { en: "", es: "" },
  },
];
