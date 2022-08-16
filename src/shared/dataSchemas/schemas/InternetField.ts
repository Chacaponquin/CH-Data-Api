import { faker } from "@faker-js/faker";
import {
  INPUT_ARGUMENT_TYPE,
  TypeOptionSchema,
} from "../../interfaces/fields.interface";

export const InternetField = (): TypeOptionSchema[] => {
  return [
    {
      exampleValue: faker.internet.domainName(),
      getValue: () => faker.internet.domainName(),
      name: "Domain Name",
    },
    {
      exampleValue: faker.internet.email(),
      getValue: (args) =>
        faker.internet.email(
          args.firstName,
          args.lastName,
          args.provider,
          args.allowSpecialCharacters
        ),
      name: "Email",
      arguments: [
        { argument: "firstName", inputType: INPUT_ARGUMENT_TYPE.TEXT },
        { argument: "lastName", inputType: INPUT_ARGUMENT_TYPE.TEXT },
        { argument: "provider", inputType: INPUT_ARGUMENT_TYPE.TEXT },
        {
          argument: "allowSpecialCharacters",
          inputType: INPUT_ARGUMENT_TYPE.BOOLEAN,
        },
      ],
    },
    {
      exampleValue: faker.internet.password(),
      getValue: (args) => faker.internet.password(args.length),
      name: "Password",
      arguments: [
        { argument: "length", inputType: INPUT_ARGUMENT_TYPE.NUMBER },
      ],
    },
    {
      exampleValue: faker.internet.url(),
      getValue: () => faker.internet.url(),
      name: "URL",
    },
    {
      exampleValue: faker.internet.userName(),
      getValue: (args) =>
        faker.internet.userName(args.firstName, args.lastName),
      name: "User Name",
      arguments: [
        { argument: "firstName", inputType: INPUT_ARGUMENT_TYPE.TEXT },
        { argument: "lastName", inputType: INPUT_ARGUMENT_TYPE.TEXT },
      ],
    },
    {
      exampleValue: faker.internet.httpMethod(),
      getValue: () => faker.internet.httpMethod(),
      name: "HTTP Method",
    },
    {
      exampleValue: faker.internet.ip(),
      getValue: () => faker.internet.ip(),
      name: "IP",
    },
    {
      exampleValue: faker.internet.emoji(),
      getValue: () => faker.internet.emoji(),
      name: "Emoji",
    },
    {
      exampleValue: faker.internet.mac(),
      getValue: () => faker.internet.mac(),
      name: "Mac Address",
    },
    {
      exampleValue: faker.internet.port(),
      getValue: () => faker.internet.port(),
      name: "Port",
    },
    {
      exampleValue: faker.internet.ipv4(),
      getValue: () => faker.internet.ipv4(),
      name: "IPV4 Address",
    },
    {
      exampleValue: faker.internet.userAgent(),
      getValue: () => faker.internet.userAgent(),
      name: "User Agent",
    },
    {
      exampleValue: faker.internet.protocol(),
      getValue: () => faker.internet.protocol(),
      name: "Protocol",
    },
    {
      exampleValue: faker.internet.domainSuffix(),
      getValue: () => faker.internet.domainSuffix(),
      name: "Domain Suffix",
    },
    {
      exampleValue: faker.internet.domainWord(),
      getValue: () => faker.internet.domainWord(),
      name: "Domain Word",
    },
  ];
};
