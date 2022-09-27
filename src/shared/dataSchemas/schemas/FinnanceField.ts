import { faker } from "@faker-js/faker";
import { TypeOptionSchema } from "../../interfaces/fields.interface";
import { ARGUMENT_TYPE } from "../../interfaces/fieldsTypes.enum";

export const FinanceField = (): TypeOptionSchema[] => {
  return [
    {
      name: "Pin",
      getValue: () => faker.finance.pin(),
      exampleValue: faker.finance.pin(),
      arguments: [],
    },
    {
      exampleValue: faker.finance.bitcoinAddress(),
      name: "Bitcoin Address",
      getValue: () => faker.finance.bitcoinAddress(),
      arguments: [],
    },
    {
      exampleValue: faker.finance.creditCardNumber(),
      getValue: () => faker.finance.creditCardNumber(),
      arguments: [],
      name: "Creadit Card Number",
    },
    {
      exampleValue: faker.finance.ethereumAddress(),
      getValue: () => faker.finance.ethereumAddress(),
      arguments: [],
      name: "Ethereum Address",
    },
    {
      exampleValue: faker.finance.account(),
      getValue: (args) => faker.finance.account(args.length as number),
      name: "Account",
      arguments: [
        {
          argument: "length",
          inputType: ARGUMENT_TYPE.NUMBER,
          description: "Longitud máxima que puede tener la cuenta",
        },
      ],
    },
    {
      exampleValue: faker.finance.accountName(),
      name: "Account Name",
      getValue: () => faker.finance.accountName(),
      arguments: [],
    },
    {
      exampleValue: faker.finance.amount(),
      getValue: () => faker.finance.amount(),
      name: "Amount",
      arguments: [],
    },
    {
      exampleValue: faker.finance.creditCardCVV(),
      getValue: () => faker.finance.creditCardCVV(),
      name: "Credict Card CVV",
      arguments: [],
    },
    {
      exampleValue: faker.finance.routingNumber(),
      getValue: () => faker.finance.routingNumber(),
      name: "Routing Number",
      arguments: [],
    },
    {
      exampleValue: faker.finance.bic(),
      getValue: () => faker.finance.bic(),
      name: "Bic",
      arguments: [],
    },
  ];
};
