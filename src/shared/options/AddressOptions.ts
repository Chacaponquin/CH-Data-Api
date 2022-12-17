import { OptionSchema } from "../interfaces/fields.interface";
import { schemas } from "chaca";
import { ARGUMENT_TYPE } from "../interfaces/fieldsTypes.enum";

export const AddressOptions: OptionSchema[] = [
  {
    name: "Zip Code",
    getValue: schemas.address.zipCode().getValue,
    exampleValue: schemas.address.zipCode().getValue(),
    arguments: [
      {
        argument: "format",
        description: { en: "", es: "" },
        inputType: ARGUMENT_TYPE.TEXT,
      },
    ],
    description: { en: "", es: "" },
  },
  {
    name: "Time Zone",
    exampleValue: schemas.address.timeZone().getValue(),
    getValue: schemas.address.timeZone().getValue,
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    name: "Cardinal Direction",
    exampleValue: schemas.address.cardinalDirection().getValue(),
    getValue: schemas.address.cardinalDirection().getValue,
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    name: "Country",
    exampleValue: schemas.address.country().getValue(),
    getValue: schemas.address.country().getValue,
    arguments: [
      {
        argument: "continent",
        description: { en: "", es: "" },
        inputType: ARGUMENT_TYPE.SELECT,
        selectValues: [
          "Asia",
          "Africa",
          "Oseania",
          "Europe",
          "South America",
          "North America",
          "Antartica",
        ],
      },
    ],
    description: { en: "", es: "" },
  },
  {
    name: "Country Code",
    exampleValue: schemas.address.countryCode().getValue(),
    getValue: schemas.address.countryCode().getValue,
    arguments: [],
    description: { en: "", es: "" },
  },
];
