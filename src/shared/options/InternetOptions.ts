import { schemas } from "chaca";
import { OptionSchema } from "../interfaces/fields.interface";
import { ARGUMENT_TYPE } from "../interfaces/fieldsTypes.enum";

export const InternetOptions: OptionSchema[] = [
  {
    exampleValue: schemas.internet.domainName().getValue(),
    getValue: schemas.internet.domainName().getValue,
    name: "Domain Name",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.internet.email().getValue(),
    getValue: schemas.internet.email().getValue,
    name: "Email",
    arguments: [
      {
        argument: "firstName",
        inputType: ARGUMENT_TYPE.TEXT,
        description: { en: "", es: "" },
      },
      {
        argument: "lastName",
        inputType: ARGUMENT_TYPE.TEXT,
        description: { en: "", es: "" },
      },
      {
        argument: "provider",
        inputType: ARGUMENT_TYPE.TEXT,
        description: { en: "", es: "" },
      },
    ],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.internet.password().getValue(),
    getValue: schemas.internet.password().getValue,
    name: "Password",
    arguments: [
      {
        argument: "len",
        inputType: ARGUMENT_TYPE.NUMBER,
        description: { en: "", es: "" },
      },
      {
        argument: "memorable",
        inputType: ARGUMENT_TYPE.BOOLEAN,
        description: { en: "", es: "" },
      },
      {
        argument: "prefix",
        description: { en: "", es: "" },
        inputType: ARGUMENT_TYPE.TEXT,
      },
    ],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.internet.url().getValue(),
    getValue: schemas.internet.url().getValue,
    name: "Url",
    arguments: [
      {
        argument: "secure",
        description: { en: "", es: "" },
        inputType: ARGUMENT_TYPE.BOOLEAN,
      },
    ],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.internet.userName().getValue(),
    getValue: schemas.internet.userName().getValue,
    name: "User Name",
    arguments: [
      {
        argument: "firstName",
        inputType: ARGUMENT_TYPE.TEXT,
        description: { en: "", es: "" },
      },
      {
        argument: "lastName",
        inputType: ARGUMENT_TYPE.TEXT,
        description: { en: "", es: "" },
      },
    ],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.internet.httpMethod().getValue(),
    description: { en: "", es: "" },
    getValue: schemas.internet.httpMethod().getValue,
    name: "HTTP Method",
    arguments: [],
  },
  {
    exampleValue: schemas.internet.ipv4().getValue(),
    getValue: schemas.internet.ipv4().getValue,
    name: "Ipv4",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.internet.emoji().getValue(),
    getValue: schemas.internet.emoji().getValue,
    name: "Emoji",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.internet.mac().getValue(),
    description: { en: "", es: "" },
    getValue: schemas.internet.mac().getValue,
    name: "Mac Address",
    arguments: [],
  },
  {
    exampleValue: schemas.internet.port().getValue(),
    description: { en: "", es: "" },
    getValue: schemas.internet.port().getValue,
    name: "Port",
    arguments: [],
  },
  {
    exampleValue: schemas.internet.userAgent().getValue(),
    getValue: schemas.internet.userAgent().getValue,
    name: "User Agent",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.internet.protocol().getValue(),
    getValue: schemas.internet.protocol().getValue,
    name: "Protocol",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.internet.domainSuffix().getValue(),
    getValue: schemas.internet.domainSuffix().getValue,
    name: "Domain Suffix",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.internet.httpStatusCode().getValue(),
    getValue: schemas.internet.httpStatusCode().getValue,
    name: "HTTP Status Code",
    arguments: [],
    description: { en: "", es: "" },
  },
];
