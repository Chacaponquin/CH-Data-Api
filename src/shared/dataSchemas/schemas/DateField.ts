import { faker, FakerError } from "@faker-js/faker";
import { TypeOptionSchema } from "../../interfaces/fields.interface";
import { ARGUMENT_TYPE } from "../../interfaces/fieldsTypes.enum";

export const DateField = (): TypeOptionSchema[] => {
  return [
    {
      exampleValue: faker.date.soon(),
      getValue: (args) => {
        return faker.date.soon(
          (args.days as number) || 10,
          args.refDate as Date
        );
      },
      name: "Date Soon",
      arguments: [
        {
          argument: "days",
          inputType: ARGUMENT_TYPE.NUMBER,
          description: "Rango de días en los que se encontrará la fecha",
        },
        {
          argument: "refDate",
          inputType: ARGUMENT_TYPE.DATE,
          description:
            "Fecha de referencia para devolver una fecha cercana a la seleccionada",
        },
      ],
    },
    {
      exampleValue: faker.date.past(),
      getValue: (args) =>
        faker.date.past((args.years as number) || 10, args.refDate as Date),
      name: "Date Past",
      arguments: [
        {
          argument: "refDate",
          inputType: ARGUMENT_TYPE.DATE,
          description:
            "Fecha de referencia para devolver una fecha anterior a la seleccionada",
        },
        {
          argument: "years",
          inputType: ARGUMENT_TYPE.NUMBER,
          description: "Rango de años para seleccionar una fecha",
        },
      ],
    },
    {
      exampleValue: faker.date.future(),
      getValue: (args) =>
        faker.date.future((args.years as number) || 10, args.refDate as Date),
      name: "Date Future",
      arguments: [
        {
          argument: "years",
          inputType: ARGUMENT_TYPE.NUMBER,
          description: "Rango de años para devolver una fecha del futuro",
        },
        {
          argument: "refDate",
          inputType: ARGUMENT_TYPE.DATE,
          description:
            "Fecha de referencia para devolver una fecha futura a la seleccionada",
        },
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
          min: (args.min as number) || 1,
          max: (args.max as number) || 99,
        }),
      name: "BirthDate",
      arguments: [
        {
          argument: "min",
          inputType: ARGUMENT_TYPE.NUMBER,
          description: "Años minimos que debe tener la persona",
        },
        {
          argument: "max",
          inputType: ARGUMENT_TYPE.NUMBER,
          description: "Años máximos que debe tener la persona ",
        },
      ],
    },
    {
      exampleValue: faker.date.between(
        "2020-01-01T00:00:00.000Z",
        "2030-01-01T00:00:00.000Z"
      ),
      getValue: (args) =>
        faker.date.between(
          (args.from as Date) || faker.date.past(100),
          (args.to as Date) || new Date()
        ),
      name: "Date Between",
      arguments: [
        {
          argument: "from",
          inputType: ARGUMENT_TYPE.DATE,
          description: "Fecha de inicio del rango",
        },
        {
          argument: "to",
          inputType: ARGUMENT_TYPE.DATE,
          description: "Fecha final del rango",
        },
      ],
    },
  ];
};
