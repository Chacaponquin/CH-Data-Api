import { faker } from "@faker-js/faker";
import { randomChoiceList } from "../../../helpers/randomChoice";
import { TypeOptionSchema } from "../../../interfaces/fields.interface";
import prefixList from "../../../helpers/data/phonePrefix.json";

export const PhoneField = (): TypeOptionSchema[] => {
  return [
    {
      name: "Number",
      getValue: () => faker.phone.number(),
      exampleValue: faker.phone.number(),
      arguments: [],
    },
    {
      name: "Prefix",
      exampleValue: "+53",
      getValue: () =>
        randomChoiceList(prefixList.map((el: any) => "+" + String(el.code))),
      arguments: [],
    },
  ];
};
