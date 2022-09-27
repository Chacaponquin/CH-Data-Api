import { faker } from "@faker-js/faker";
import { TypeOptionSchema } from "../../interfaces/fields.interface";
import { ARGUMENT_TYPE } from "../../interfaces/fieldsTypes.enum";

export const InternetField = (): TypeOptionSchema[] => {
  return [
    {
      exampleValue: faker.internet.domainName(),
      getValue: () => faker.internet.domainName(),
      name: "Domain Name",
      arguments: [],
    },
    {
      exampleValue: faker.internet.email(),
      getValue: (args) =>
        faker.internet.email(
          args.firstName as string,
          args.lastName as string,
          args.provider as string,
          { allowSpecialCharacters: args.allowSpecialCharacters as boolean }
        ),
      name: "Email",
      arguments: [
        {
          argument: "firstName",
          inputType: ARGUMENT_TYPE.TEXT,
          description:
            "Primer nombre del dueño del email para poder ser introducido en el email resultante",
        },
        {
          argument: "lastName",
          inputType: ARGUMENT_TYPE.TEXT,
          description:
            "Apellido del dueño del email para poder ser introducido en el email resultante",
        },
        {
          argument: "provider",
          inputType: ARGUMENT_TYPE.TEXT,
          description: "El provedor del emial. Ejemplo: gmail, hotmail, etc.",
        },
        {
          argument: "allowSpecialCharacters",
          inputType: ARGUMENT_TYPE.BOOLEAN,
          description: "Indica si se pueden utilizar carácteres especiales",
        },
      ],
    },
    {
      exampleValue: faker.internet.password(),
      getValue: (args) => faker.internet.password(args.length as number),
      name: "Password",
      arguments: [
        {
          argument: "length",
          inputType: ARGUMENT_TYPE.NUMBER,
          description: "Longitud máxima de la contraseña",
        },
      ],
    },
    {
      exampleValue: faker.internet.url(),
      getValue: () => faker.internet.url(),
      name: "URL",
      arguments: [],
    },
    {
      exampleValue: faker.internet.userName(),
      getValue: (args) =>
        faker.internet.userName(
          args.firstName as string,
          args.lastName as string
        ),
      name: "User Name",
      arguments: [
        {
          argument: "firstName",
          inputType: ARGUMENT_TYPE.TEXT,
          description:
            "Primer nombre de la persona para ser utilizado en su nombre de usuario",
        },
        {
          argument: "lastName",
          inputType: ARGUMENT_TYPE.TEXT,
          description:
            "Apellido de la persona para ser utilizado en su nombre de usuario",
        },
      ],
    },
    {
      exampleValue: faker.internet.httpMethod(),
      getValue: () => faker.internet.httpMethod(),
      name: "HTTP Method",
      arguments: [],
    },
    {
      exampleValue: faker.internet.ip(),
      getValue: () => faker.internet.ip(),
      name: "IP",
      arguments: [],
    },
    {
      exampleValue: faker.internet.emoji(),
      getValue: () => faker.internet.emoji(),
      name: "Emoji",
      arguments: [],
    },
    {
      exampleValue: faker.internet.mac(),
      getValue: () => faker.internet.mac(),
      name: "Mac Address",
      arguments: [],
    },
    {
      exampleValue: faker.internet.port(),
      getValue: () => faker.internet.port(),
      name: "Port",
      arguments: [],
    },
    {
      exampleValue: faker.internet.ipv4(),
      getValue: () => faker.internet.ipv4(),
      name: "IPV4 Address",
      arguments: [],
    },
    {
      exampleValue: faker.internet.userAgent(),
      getValue: () => faker.internet.userAgent(),
      name: "User Agent",
      arguments: [],
    },
    {
      exampleValue: faker.internet.protocol(),
      getValue: () => faker.internet.protocol(),
      name: "Protocol",
      arguments: [],
    },
    {
      exampleValue: faker.internet.domainSuffix(),
      getValue: () => faker.internet.domainSuffix(),
      name: "Domain Suffix",
      arguments: [],
    },
    {
      exampleValue: faker.internet.domainWord(),
      getValue: () => faker.internet.domainWord(),
      name: "Domain Word",
      arguments: [],
    },
  ];
};
