import { faker } from "@faker-js/faker";
import { TypeOptionSchema } from "../../../interfaces/fields.interface";
import { v4 as uuid } from "uuid";

export const IDField = (): TypeOptionSchema[] => {
  return [
    {
      name: "MongoDB ID",
      exampleValue: faker.database.mongodbObjectId(),
      getValue: () => faker.database.mongodbObjectId(),
      arguments: [],
    },
    {
      name: "Number Row",
      exampleValue: Date.now(),
      getValue: () => Date.now(),
      arguments: [],
    },
    {
      name: "UUID",
      exampleValue: uuid(),
      getValue: () => uuid(),
      arguments: [],
    },
  ];
};
