import { OptionSchema } from "../interfaces/fields.interface";
import { ARGUMENT_TYPE } from "../interfaces/fieldsTypes.enum";
import { schemas } from "chaca";

export const DateOptions: OptionSchema[] = [
  {
    exampleValue: schemas.date.timeAgo().getValue(),
    name: "Time Ago",
    description: { en: "", es: "" },
    arguments: [
      {
        argument: "unit",
        description: { en: "", es: "" },
        inputType: ARGUMENT_TYPE.SELECT,
        selectValues: [
          "years",
          "seconds",
          "minutes",
          "days",
          "hours",
          "months",
        ],
      },
    ],
    getValue: schemas.date.timeAgo().getValue,
  },
  {
    exampleValue: schemas.date.soon().getValue(),
    getValue: schemas.date.soon().getValue,
    name: "Date Soon",
    arguments: [
      {
        argument: "days",
        inputType: ARGUMENT_TYPE.NUMBER,
        description: { en: "", es: "" },
      },
      {
        argument: "refDate",
        inputType: ARGUMENT_TYPE.DATE,
        description: { en: "", es: "" },
      },
    ],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.date.past().getValue(),
    getValue: schemas.date.past().getValue,
    name: "Date Past",
    arguments: [
      {
        argument: "refDate",
        inputType: ARGUMENT_TYPE.DATE,
        description: { en: "", es: "" },
      },
      {
        argument: "years",
        inputType: ARGUMENT_TYPE.NUMBER,
        description: { en: "", es: "" },
      },
    ],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.date.future().getValue(),
    getValue: schemas.date.future().getValue,
    name: "Date Future",
    arguments: [
      {
        argument: "years",
        inputType: ARGUMENT_TYPE.NUMBER,
        description: { en: "", es: "" },
      },
      {
        argument: "refDate",
        inputType: ARGUMENT_TYPE.DATE,
        description: { en: "", es: "" },
      },
    ],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.date.month().getValue(),
    getValue: schemas.date.month().getValue,
    name: "Month",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.date.weekDay().getValue(),
    getValue: schemas.date.weekDay().getValue,
    name: "Weekday",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.date.birthdate().getValue(),
    getValue: schemas.date.birthdate().getValue,
    name: "BirthDate",
    arguments: [
      {
        argument: "min",
        inputType: ARGUMENT_TYPE.NUMBER,
        description: { en: "", es: "" },
      },
      {
        argument: "max",
        inputType: ARGUMENT_TYPE.NUMBER,
        description: { en: "", es: "" },
      },
      {
        argument: "refDate",
        inputType: ARGUMENT_TYPE.DATE,
        description: { en: "", es: "" },
      },
      {
        argument: "mode",
        inputType: ARGUMENT_TYPE.SELECT,
        description: { en: "", es: "" },
        selectValues: ["year", "age"],
      },
    ],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.date.between().getValue(),
    getValue: schemas.date.between().getValue,
    name: "Date Between",
    arguments: [
      {
        argument: "from",
        inputType: ARGUMENT_TYPE.DATE,
        description: { en: "", es: "" },
      },
      {
        argument: "to",
        inputType: ARGUMENT_TYPE.DATE,
        description: { en: "", es: "" },
      },
    ],
    description: { en: "", es: "" },
  },
];
