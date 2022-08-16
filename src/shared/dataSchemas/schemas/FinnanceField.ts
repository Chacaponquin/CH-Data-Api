import { faker } from "@faker-js/faker";
import {
  INPUT_ARGUMENT_TYPE,
  TypeOptionSchema,
} from "../../interfaces/fields.interface";

export const FinanceField = (): TypeOptionSchema[] => {
  return [
    {
      name: "Pin",
      getValue: () => faker.finance.pin,
      exampleValue: faker.finance.pin,
    },
    {
      exampleValue: faker.finance.bitcoinAddress(),
      name: "Bitcoin Address",
      getValue: () => faker.finance.bitcoinAddress(),
    },
    {
      exampleValue: faker.finance.creditCardNumber(),
      getValue: () => faker.finance.creditCardNumber(),
      name: "Creadit Card Number",
    },
    {
      exampleValue: faker.finance.ethereumAddress(),
      getValue: () => faker.finance.ethereumAddress(),
      name: "Ethereum Address",
    },
    {
      exampleValue: faker.finance.account(),
      getValue: (args) => faker.finance.account(args.length),
      name: "Account",
      arguments: [
        { argument: "length", inputType: INPUT_ARGUMENT_TYPE.NUMBER },
      ],
    },
    {
      exampleValue: faker.finance.accountName,
      name: "Account Name",
      getValue: () => faker.finance.accountName(),
    },
    {
      exampleValue: faker.finance.amount(),
      getValue: () => faker.finance.amount(),
      name: "Amount",
    },
    {
      exampleValue: faker.finance.creditCardCVV(),
      getValue: () => faker.finance.creditCardCVV(),
      name: "Credict Card CVV",
    },
    {
      exampleValue: faker.finance.routingNumber(),
      getValue: () => faker.finance.routingNumber(),
      name: "Routing Number",
    },
    {
      exampleValue: faker.finance.bic(),
      getValue: () => faker.finance.bic(),
      name: "Bic",
    },
  ];
};
