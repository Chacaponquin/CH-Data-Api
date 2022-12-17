import { OptionSchema } from "../interfaces/fields.interface";
import { ARGUMENT_TYPE } from "../interfaces/fieldsTypes.enum";
import { schemas } from "chaca";

export const FinanceOptions: OptionSchema[] = [
  {
    name: "Money Code",
    arguments: [],
    getValue: schemas.finance.moneyCode().getValue,
    description: { en: "", es: "" },
    exampleValue: schemas.finance.moneyCode().getValue(),
  },
  {
    name: "Money Symbol",
    arguments: [],
    getValue: schemas.finance.moneySymbol().getValue,
    description: { en: "", es: "" },
    exampleValue: schemas.finance.moneySymbol().getValue(),
  },
  {
    name: "Currency Money Name",
    arguments: [],
    getValue: schemas.finance.currencyMoneyName().getValue,
    description: { en: "", es: "" },
    exampleValue: schemas.finance.currencyMoneyName().getValue(),
  },
  {
    name: "Pin",
    getValue: schemas.finance.pin().getValue,
    exampleValue: schemas.finance.pin(),
    arguments: [
      {
        argument: "length",
        description: { en: "", es: "" },
        inputType: ARGUMENT_TYPE.NUMBER,
      },
    ],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.finance.bitcoinAddress().getValue(),
    name: "Bitcoin Address",
    getValue: schemas.finance.bitcoinAddress().getValue,
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.finance.creditCard().getValue(),
    getValue: schemas.finance.creditCard().getValue,
    arguments: [],
    name: "Credit Card Number",
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.finance.ethereumAddress().getValue(),
    getValue: schemas.finance.ethereumAddress().getValue,
    arguments: [],
    name: "Ethereum Address",
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.finance.accountType().getValue(),
    name: "Account Type",
    getValue: schemas.finance.accountType().getValue,
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.finance.amount().getValue(),
    getValue: schemas.finance.amount().getValue,
    name: "Amount",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.finance.creditCardCVV().getValue(),
    getValue: schemas.finance.creditCardCVV().getValue,
    name: "Credict Card CVV",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.finance.routingNumber().getValue(),
    getValue: schemas.finance.routingNumber().getValue,
    name: "Routing Number",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.finance.bic().getValue(),
    getValue: schemas.finance.bic().getValue,
    name: "Bic",
    arguments: [],
    description: { en: "", es: "" },
  },
];
