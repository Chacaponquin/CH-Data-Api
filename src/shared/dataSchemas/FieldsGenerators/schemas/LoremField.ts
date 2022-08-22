import { faker } from "@faker-js/faker";
import { InvalidArgumentError } from "../../../errors/InvalidArgument";
import { TypeOptionSchema } from "../../../interfaces/fields.interface";
import { ARGUMENT_TYPE } from "../../../interfaces/fieldsTypes.enum";

export const LoremField = (): TypeOptionSchema[] => {
  return [
    {
      name: "Lines",
      exampleValue: faker.lorem.lines(),
      getValue: ({ count }) => {
        if (count < 1) {
          throw new InvalidArgumentError(
            "La cantidad de lineas no puede ser menor a 1"
          );
        }

        return faker.lorem.lines(count);
      },
      arguments: [
        {
          argument: "count",
          inputType: ARGUMENT_TYPE.NUMBER,
          description:
            "Cantidad de líneas a generar. Por defecto será un valor entre 1 y 5",
        },
      ],
    },
    {
      name: "Paragraphs",
      exampleValue: faker.lorem.paragraphs(),
      getValue: (args) => {
        if (args.count < 1) {
          throw new InvalidArgumentError(
            "La cantidad de lineas no puede ser menor a 1"
          );
        }
        return faker.lorem.paragraphs(args.count, args.separator);
      },
      arguments: [
        {
          argument: "count",
          inputType: ARGUMENT_TYPE.NUMBER,
          description: "Cantidad de párrafos a generar",
        },
        {
          argument: "separator",
          inputType: ARGUMENT_TYPE.TEXT,
          description:
            "Texto que separará a cada párrafo del siguiente. Por defecto es un salto de línea",
        },
      ],
    },
    {
      name: "Sentences",
      exampleValue: faker.lorem.sentences(),
      getValue: (args) => faker.lorem.sentences(args.count, args.separator),
      arguments: [
        {
          argument: "count",
          inputType: ARGUMENT_TYPE.NUMBER,
          description: "Cantidad de oraciones a generar",
        },
        {
          argument: "separator",
          inputType: ARGUMENT_TYPE.TEXT,
          description: "Texto que separa a cada oración de la siguiente",
        },
      ],
    },
    {
      name: "Slug",
      exampleValue: faker.lorem.slug(),
      getValue: (args) => faker.lorem.slug(args.wordCount),
      arguments: [
        {
          argument: "wordCount",
          inputType: ARGUMENT_TYPE.NUMBER,
          description: "Cantidad de palabras",
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
          description:
            "Cantidad de palabras a generar. Por defecto se generan 3 palabras",
        },
      ],
    },
  ];
};
