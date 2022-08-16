import { faker } from "@faker-js/faker";
import { InvalidArgumentError } from "../../errors/InvalidArgument";
import {
  INPUT_ARGUMENT_TYPE,
  TypeOptionSchema,
} from "../../interfaces/fields.interface";

export const DataTypeField = (): TypeOptionSchema[] => {
  return [
    {
      name: "Number",
      getValue: (args) => {
        if (args.min > args.max)
          throw new InvalidArgumentError(
            "El parametro min no puede ser mayor al max"
          );

        return faker.datatype.number({ min: args.min, max: args.max });
      },
      exampleValue: faker.datatype.number(),
      arguments: [
        { argument: "min", inputType: INPUT_ARGUMENT_TYPE.NUMBER },
        { argument: "max", inputType: INPUT_ARGUMENT_TYPE.NUMBER },
      ],
    },
    {
      exampleValue: faker.datatype.array(),
      getValue: (args) => faker.datatype.array(args.length),
      name: "Array (Random values)",
      arguments: [
        { argument: "length", inputType: INPUT_ARGUMENT_TYPE.NUMBER },
      ],
    },
    {
      exampleValue: faker.datatype.boolean,
      getValue: () => faker.datatype.boolean(),
      name: "Boolean",
    },
    {
      exampleValue: faker.datatype.number(),
      getValue: (args) => {
        if (args.min > args.max)
          throw new InvalidArgumentError(
            "El parametro min no puede ser mayor al max"
          );

        if (args.precision < 0)
          throw new InvalidArgumentError(
            "La precicsion no puede ser un numero negativo"
          );

        return faker.datatype.number({
          max: args.max,
          min: args.min,
          precision: args.precision,
        });
      },
      name: "Number (Int)",
      arguments: [
        {
          argument: "min",
          inputType: INPUT_ARGUMENT_TYPE.NUMBER,
        },
        { argument: "max", inputType: INPUT_ARGUMENT_TYPE.NUMBER },
        { argument: "precision", inputType: INPUT_ARGUMENT_TYPE.FLOAT },
      ],
    },
    {
      exampleValue: faker.datatype.hexadecimal,
      getValue: (args) => faker.datatype.hexadecimal(args.length),
      name: "Hexadecimal",
      arguments: [
        { argument: "length", inputType: INPUT_ARGUMENT_TYPE.NUMBER },
      ],
    },
    {
      exampleValue: faker.datatype.float(),
      getValue: (args) => {
        if (args.min > args.max)
          throw new InvalidArgumentError(
            "El parametro min no puede ser mayor al max"
          );

        if (args.precision < 0)
          throw new InvalidArgumentError(
            "La precicsion no puede ser un numero negativo"
          );

        return faker.datatype.number({
          max: args.max,
          min: args.min,
          precision: args.precision,
        });
      },
      name: "Number (Float)",
      arguments: [
        {
          argument: "min",
          inputType: INPUT_ARGUMENT_TYPE.FLOAT,
        },
        { argument: "max", inputType: INPUT_ARGUMENT_TYPE.FLOAT },
        { argument: "precision", inputType: INPUT_ARGUMENT_TYPE.FLOAT },
      ],
    },
    {
      exampleValue: [
        [1, 0, 1, 1],
        [0, 0, 0, 1],
        [1, 1, 0, 0],
      ],
      getValue: (args) => {
        if (args.x_size <= 0 || args.y_size <= 0)
          throw new InvalidArgumentError(
            "El tamaño de la matriz no puede ser un numero menor o igual a cero"
          );

        if (args.min > args.max)
          throw new InvalidArgumentError(
            "El parametro min no puede ser mayor al max"
          );

        if (args.precision < 0)
          throw new InvalidArgumentError(
            "La precicsion no puede ser un numero negativo"
          );

        return new Array(args.y_size ? args.y_size : faker.datatype.number())
          .fill(0)
          .map((el) => {
            return new Array(
              args.x_size ? args.x_size : faker.datatype.number()
            )
              .fill(0)
              .map((el) => {
                let value;

                if (args.dataType === "Int")
                  value = faker.datatype.number({
                    min: args.min,
                    max: args.max,
                  });
                else if (args.dataType === "Float")
                  value = faker.datatype.float({
                    min: args.min,
                    max: args.max,
                    precision: args.precision,
                  });
                else
                  value = faker.datatype.number({
                    min: args.min,
                    max: args.max,
                  });

                return value;
              });
          });
      },
      name: "Matriz",
      arguments: [
        { argument: "x_size", inputType: INPUT_ARGUMENT_TYPE.NUMBER },
        { argument: "y_size", inputType: INPUT_ARGUMENT_TYPE.NUMBER },
        { argument: "precision", inputType: INPUT_ARGUMENT_TYPE.FLOAT },
        { argument: "min", inputType: INPUT_ARGUMENT_TYPE.FLOAT },
        { argument: "max", inputType: INPUT_ARGUMENT_TYPE.FLOAT },
        {
          argument: "dataType",
          inputType: INPUT_ARGUMENT_TYPE.SELECT,
          selectValues: ["Int", "Float"],
        },
      ],
    },
  ];
};