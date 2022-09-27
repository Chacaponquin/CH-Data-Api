import { faker } from "@faker-js/faker";
import { TypeOptionSchema } from "../../interfaces/fields.interface";

export const AddressField = (): TypeOptionSchema[] => {
  faker.address;
  return [
    {
      name: "Zip Code",
      getValue: () => faker.address.zipCode(),
      exampleValue: faker.address.zipCode(),
      arguments: [],
    },
    {
      name: "Time Zone",
      exampleValue: faker.address.timeZone(),
      getValue: () => faker.address.timeZone(),
      arguments: [],
    },
    {
      name: "Cardinal Direction",
      exampleValue: faker.address.cardinalDirection(),
      getValue: () => faker.address.cardinalDirection(),
      arguments: [],
    },
    {
      name: "Country",
      exampleValue: faker.address.country(),
      getValue: () => faker.address.country(),
      arguments: [],
    },
    {
      name: "Country Code",
      exampleValue: faker.address.countryCode(),
      getValue: () => faker.address.countryCode(),
      arguments: [],
    },
    {
      name: "City",
      exampleValue: faker.address.city(),
      getValue: () => faker.address.city(),
      arguments: [],
    },
    {
      name: "Street",
      exampleValue: faker.address.street(),
      getValue: () => faker.address.street(),
      arguments: [],
    },
    {
      name: "Street Address",
      getValue: () => faker.address.streetAddress(),
      exampleValue: faker.address.streetAddress(),
      arguments: [],
    },
  ];
};
