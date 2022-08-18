import { faker, FakerError } from "@faker-js/faker";
import { TypeOptionSchema } from "../../../interfaces/fields.interface";
import { ARGUMENT_TYPE } from "../../../interfaces/fieldsTypes.enum";

export const DateField = (): TypeOptionSchema[] => {
  return [
    {
      exampleValue: faker.date.soon(),
      getValue(args) {
        return faker.date.soon(args.days, args.refDate);
      },
      name: "Date Soon",
      arguments: [
        { argument: "days", inputType: ARGUMENT_TYPE.NUMBER },
        { argument: "refDate", inputType: ARGUMENT_TYPE.DATE },
      ],
    },
    {
      exampleValue: faker.date.past(),
      getValue: (args) => faker.date.past(args.years, args.refDate),
      name: "Date Past",
      arguments: [
        { argument: "refDate", inputType: ARGUMENT_TYPE.DATE },
        { argument: "years", inputType: ARGUMENT_TYPE.NUMBER },
      ],
    },
    {
      exampleValue: faker.date.future(),
      getValue: (args) => faker.date.future(args.years, args.refDate),
      name: "Date Future",
      arguments: [
        {
          argument: "years",
          inputType: ARGUMENT_TYPE.NUMBER,
        },
        { argument: "refDate", inputType: ARGUMENT_TYPE.DATE },
      ],
    },
    {
      exampleValue: faker.date.month(),
      getValue: () => faker.date.month(),
      name: "Month Name",
      arguments: [],
    },
    {
      exampleValue: faker.date.weekday(),
      getValue: () => faker.date.weekday(),
      name: "Weekday",
      arguments: [],
    },
    {
      exampleValue: faker.date.birthdate(),
      getValue: (args) =>
        faker.date.birthdate({
          min: args.min,
          max: args.max,
        }),
      name: "BirthDate",
      arguments: [
        { argument: "min", inputType: ARGUMENT_TYPE.NUMBER },
        { argument: "max", inputType: ARGUMENT_TYPE.NUMBER },
      ],
    },
    {
      exampleValue: faker.date.between(
        "2020-01-01T00:00:00.000Z",
        "2030-01-01T00:00:00.000Z"
      ),
      getValue: (args) =>
        faker.date.between(
          args.from ? args.from : faker.date.past(100),
          args.to ? args.to : new Date()
        ),
      name: "Date Between",
      arguments: [
        { argument: "from", inputType: ARGUMENT_TYPE.DATE },
        { argument: "to", inputType: ARGUMENT_TYPE.DATE },
      ],
    },
  ];
};
