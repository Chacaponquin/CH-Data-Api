import { faker } from "@faker-js/faker";
import {
  INPUT_ARGUMENT_TYPE,
  TypeOptionSchema,
} from "../../interfaces/fields.interface";

export const AddressField = (): TypeOptionSchema[] => {
  faker.address;
  return [
    {
      name: "Zip Code",
      getValue: () => faker.address.zipCode(),
      exampleValue: faker.address.zipCode(),
    },
    {
      name: "Time Zone",
      exampleValue: faker.address.timeZone(),
      getValue: () => faker.address.timeZone,
    },
    {
      name: "Cardinal Direction",
      exampleValue: faker.address.cardinalDirection(),
      getValue: () => faker.address.cardinalDirection(),
    },
    {
      name: "Country",
      exampleValue: faker.address.country(),
      getValue: () => faker.address.country(),
    },
    {
      name: "Country Code",
      exampleValue: faker.address.countryCode,
      getValue: () => faker.address.countryCode(),
    },
    {
      name: "City",
      exampleValue: faker.address.city(),
      getValue: () => faker.address.city(),
    },
    {
      name: "Street",
      exampleValue: faker.address.street(),
      getValue: () => faker.address.street(),
    },
    {
      name: "Street Address",
      getValue: () => faker.address.streetAddress(),
      exampleValue: faker.address.streetAddress(),
    },
  ];
};
