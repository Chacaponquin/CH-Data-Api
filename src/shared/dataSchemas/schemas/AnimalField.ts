import { faker } from "@faker-js/faker";
import { TypeOptionSchema } from "../../interfaces/fields.interface";

export const AnimalField = (): TypeOptionSchema[] => {
  return [
    {
      name: "Bear",
      exampleValue: faker.animal.bear(),
      getValue: () => faker.animal.bear(),
    },
    {
      name: "Bird",
      exampleValue: faker.animal.bird(),
      getValue: () => faker.animal.bird(),
    },
    {
      name: "Cat",
      exampleValue: faker.animal.cat(),
      getValue: () => faker.animal.cat(),
    },
    {
      name: "Cetacean",
      exampleValue: faker.animal.cetacean(),
      getValue: () => faker.animal.cetacean(),
    },
    {
      name: "Cow",
      exampleValue: faker.animal.cow(),
      getValue: () => faker.animal.cow(),
    },
    {
      name: "Crocodilia",
      exampleValue: faker.animal.crocodilia(),
      getValue: () => faker.animal.crocodilia(),
    },
    {
      name: "Dog",
      exampleValue: faker.animal.dog(),
      getValue: () => faker.animal.dog(),
    },
    {
      name: "Horse",
      exampleValue: faker.animal.horse(),
      getValue: () => faker.animal.horse(),
    },
    {
      name: "Insect",
      exampleValue: faker.animal.insect(),
      getValue: () => faker.animal.insect(),
    },
    {
      name: "Lion",
      exampleValue: faker.animal.lion(),
      getValue: () => faker.animal.lion(),
    },
    {
      name: "Rabbit",
      exampleValue: faker.animal.rabbit(),
      getValue: () => faker.animal.rabbit(),
    },
    {
      name: "Snake",
      exampleValue: faker.animal.snake(),
      getValue: () => faker.animal.snake(),
    },
    {
      name: "Random Type",
      exampleValue: faker.animal.type(),
      getValue: () => faker.animal.type(),
    },
  ];
};
