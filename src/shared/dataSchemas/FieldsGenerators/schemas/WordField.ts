import { faker } from "@faker-js/faker";
import { TypeOptionSchema } from "../../../interfaces/fields.interface";
import { ARGUMENT_TYPE } from "../../../interfaces/fieldsTypes.enum";

export const WordField = (): TypeOptionSchema[] => {
  return [
    {
      name: "Adjective",
      getValue: (args) => faker.word.adjective(args.length),
      exampleValue: faker.word.adjective(),
      arguments: [{ argument: "length", inputType: ARGUMENT_TYPE.NUMBER }],
    },
    {
      name: "Adverb",
      getValue: (args) => faker.word.adverb(args.length),
      exampleValue: faker.word.adverb(),
      arguments: [{ argument: "length", inputType: ARGUMENT_TYPE.NUMBER }],
    },
    {
      name: "Conjuction",
      getValue: (args) => faker.word.conjunction(args.length),
      exampleValue: faker.word.conjunction(),
      arguments: [{ argument: "length", inputType: ARGUMENT_TYPE.NUMBER }],
    },
    {
      name: "Interjection",
      getValue: (args) => faker.word.interjection(args.length),
      exampleValue: faker.word.interjection(),
      arguments: [{ argument: "length", inputType: ARGUMENT_TYPE.NUMBER }],
    },
    {
      name: "Noun",
      getValue: (args) => faker.word.noun(args.length),
      exampleValue: faker.word.noun(),
      arguments: [{ argument: "length", inputType: ARGUMENT_TYPE.NUMBER }],
    },
    {
      name: "Preposition",
      getValue: (args) => faker.word.preposition(args.length),
      exampleValue: faker.word.preposition(),
      arguments: [{ argument: "length", inputType: ARGUMENT_TYPE.NUMBER }],
    },
    {
      name: "Verb",
      getValue: (args) => faker.word.verb(args.length),
      exampleValue: faker.word.verb(),
      arguments: [{ argument: "length", inputType: ARGUMENT_TYPE.NUMBER }],
    },
  ];
};
