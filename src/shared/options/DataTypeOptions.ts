import { OptionSchema } from "../interfaces/fields.interface";
import { ARGUMENT_TYPE } from "../interfaces/fieldsTypes.enum";
import { schemas } from "chaca";

export const DataTypeOptions: OptionSchema[] = [
  {
    exampleValue: schemas.dataType.boolean().getValue(),
    getValue: schemas.dataType.boolean().getValue,
    name: "Boolean",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.dataType.int().getValue(),
    getValue: schemas.dataType.int().getValue,
    name: "Number Int",
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
        argument: "precision",
        inputType: ARGUMENT_TYPE.FLOAT,
        description: { en: "", es: "" },
      },
    ],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.dataType.hexadecimal().getValue(),
    getValue: schemas.dataType.hexadecimal().getValue,
    name: "Hexadecimal",
    arguments: [
      {
        argument: "length",
        inputType: ARGUMENT_TYPE.NUMBER,
        description: { en: "", es: "" },
      },
    ],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.dataType.float().getValue(),
    getValue: schemas.dataType.float().getValue,
    name: "Float",
    arguments: [
      {
        argument: "min",
        inputType: ARGUMENT_TYPE.FLOAT,
        description: { en: "", es: "" },
      },
      {
        argument: "max",
        inputType: ARGUMENT_TYPE.FLOAT,
        description: { en: "", es: "" },
      },
      {
        argument: "precision",
        inputType: ARGUMENT_TYPE.FLOAT,
        description: { en: "", es: "" },
      },
    ],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.dataType.matriz().getValue(),
    getValue: schemas.dataType.matriz().getValue,
    name: "Matriz",
    arguments: [
      {
        argument: "x_size",
        inputType: ARGUMENT_TYPE.NUMBER,
        description: { en: "", es: "" },
      },
      {
        argument: "y_size",
        inputType: ARGUMENT_TYPE.NUMBER,
        description: { en: "", es: "" },
      },
      {
        argument: "precision",
        inputType: ARGUMENT_TYPE.FLOAT,
        description: { en: "", es: "" },
      },
      {
        argument: "min",
        inputType: ARGUMENT_TYPE.FLOAT,
        description: { en: "", es: "" },
      },
      {
        argument: "max",
        inputType: ARGUMENT_TYPE.FLOAT,
        description: { en: "", es: "" },
      },
      {
        argument: "dataType",
        inputType: ARGUMENT_TYPE.SELECT,
        selectValues: ["Int", "Float"],
        description: { en: "", es: "" },
      },
    ],
    description: { en: "", es: "" },
  },
];
