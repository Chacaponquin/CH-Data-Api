import { faker } from "@faker-js/faker";
import { TypeOptionSchema } from "../../../interfaces/fields.interface";

export const AnimalField = (): TypeOptionSchema[] => {
  return [
    {
      name: "Bear",
      exampleValue: faker.animal.bear(),
      getValue: () => faker.animal.bear(),
      arguments: [],
    },
    {
      name: "Bird",
      exampleValue: faker.animal.bird(),
      getValue: () => faker.animal.bird(),
      arguments: [],
    },
    {
      name: "Cat",
      exampleValue: faker.animal.cat(),
      getValue: () => faker.animal.cat(),
      arguments: [],
    },
    {
      name: "Cetacean",
      exampleValue: faker.animal.cetacean(),
      getValue: () => faker.animal.cetacean(),
      arguments: [],
    },
    {
      name: "Cow",
      exampleValue: faker.animal.cow(),
      getValue: () => faker.animal.cow(),
      arguments: [],
    },
    {
      name: "Crocodilia",
      exampleValue: faker.animal.crocodilia(),
      getValue: () => faker.animal.crocodilia(),
      arguments: [],
    },
    {
      name: "Dog",
      exampleValue: faker.animal.dog(),
      getValue: () => faker.animal.dog(),
      arguments: [],
    },
    {
      name: "Horse",
      exampleValue: faker.animal.horse(),
      getValue: () => faker.animal.horse(),
      arguments: [],
    },
    {
      name: "Insect",
      exampleValue: faker.animal.insect(),
      getValue: () => faker.animal.insect(),
      arguments: [],
    },
    {
      name: "Lion",
      exampleValue: faker.animal.lion(),
      getValue: () => faker.animal.lion(),
      arguments: [],
    },
    {
      name: "Rabbit",
      exampleValue: faker.animal.rabbit(),
      getValue: () => faker.animal.rabbit(),
      arguments: [],
    },
    {
      name: "Snake",
      exampleValue: faker.animal.snake(),
      getValue: () => faker.animal.snake(),
      arguments: [],
    },
    {
      name: "Random Type",
      exampleValue: faker.animal.type(),
      getValue: () => faker.animal.type(),
      arguments: [],
    },
  ];
};
