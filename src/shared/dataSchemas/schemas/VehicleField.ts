import { faker } from "@faker-js/faker";
import { TypeOptionSchema } from "../../interfaces/fields.interface";

export const VehicleField = (): TypeOptionSchema[] => {
  return [
    {
      exampleValue: faker.vehicle.bicycle(),
      getValue: () => faker.vehicle.bicycle(),
      name: "Bicycle",
      arguments: [],
    },
    {
      exampleValue: faker.vehicle.color(),
      getValue: () => faker.vehicle.color(),
      name: "Vehicle Color",
      arguments: [],
    },
    {
      exampleValue: faker.vehicle.manufacturer(),
      getValue: () => faker.vehicle.manufacturer(),
      name: "Manufacturer",
      arguments: [],
    },
    {
      exampleValue: faker.vehicle.model(),
      getValue: () => faker.vehicle.model(),
      name: "Model",
      arguments: [],
    },
    {
      exampleValue: faker.vehicle.type(),
      getValue: () => faker.vehicle.type(),
      name: "Type",
      arguments: [],
    },
    {
      exampleValue: faker.vehicle.vehicle(),
      getValue: () => faker.vehicle.vehicle(),
      name: "Vehicle",
      arguments: [],
    },
    {
      exampleValue: faker.vehicle.vin(),
      getValue: () => faker.vehicle.vin(),
      name: "Vehicle Identification",
      arguments: [],
    },
  ];
};
