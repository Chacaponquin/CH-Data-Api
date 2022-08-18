import { faker } from "@faker-js/faker";
import { TypeOptionSchema } from "../../../interfaces/fields.interface";
import { ARGUMENT_TYPE } from "../../../interfaces/fieldsTypes.enum";

export const LoremField = (): TypeOptionSchema[] => {
  return [
    {
      name: "Lines",
      exampleValue: faker.lorem.lines(),
      getValue: ({ count }) => faker.lorem.lines(count),
      arguments: [
        {
          argument: "count",
          inputType: ARGUMENT_TYPE.NUMBER,
        },
      ],
    },
    {
      name: "Paragraphs",
      exampleValue: faker.lorem.paragraphs(),
      getValue: ({ count }) => faker.lorem.lines(count),
      arguments: [
        {
          argument: "count",
          inputType: ARGUMENT_TYPE.NUMBER,
        },
      ],
    },
    {
      name: "Sentences",
      exampleValue: faker.lorem.sentences(),
      getValue: ({ count }) => faker.lorem.sentences(count),
      arguments: [
        {
          argument: "count",
          inputType: ARGUMENT_TYPE.NUMBER,
        },
      ],
    },
    {
      name: "Slug",
      exampleValue: faker.lorem.slug(),
      getValue: ({ count }) => faker.lorem.slug(count),
      arguments: [
        {
          argument: "count",
          inputType: ARGUMENT_TYPE.NUMBER,
        },
      ],
    },
    {
      name: "Text",
      exampleValue: faker.lorem.text(),
      getValue: () => faker.lorem.text(),
      arguments: [],
    },
    {
      name: "Words",
      exampleValue: faker.lorem.words(),
      getValue: ({ count }) => faker.lorem.words(count),
      arguments: [
        {
          argument: "count",
          inputType: ARGUMENT_TYPE.NUMBER,
        },
      ],
    },
  ];
};
