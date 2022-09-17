import { faker } from "@faker-js/faker";
import { InvalidArgumentError } from "../../../errors/InvalidArgument";
import { randomChoiceList } from "../../../helpers/randomChoice";
import { TypeOptionSchema } from "../../../interfaces/fields.interface";
import { ARGUMENT_TYPE } from "../../../interfaces/fieldsTypes.enum";

export const DataTypeField = (): TypeOptionSchema[] => {
  return [
    {
      exampleValue: faker.datatype.array(),
      getValue: (args) => {
        return faker.datatype
          .array(Number(args.length))
          .map((el) => el.toString());
      },
      name: "Array (Random values)",
      arguments: [
        {
          argument: "length",
          inputType: ARGUMENT_TYPE.NUMBER,
          description: "Tamaño máximo que pueda tener el arreglo",
        },
      ],
    },
    {
      exampleValue: faker.datatype.boolean(),
      getValue: () => randomChoiceList([true, false]),
      name: "Boolean",
      arguments: [],
    },
    {
      exampleValue: faker.datatype.number(),
      getValue: (args) => {
        const min = Number(args.min);
        const max = Number(args.max);
        const precision = Number(args.precision);

        if (min > max)
          throw new InvalidArgumentError(
            "El parametro min no puede ser mayor al max"
          );

        if (precision < 0)
          throw new InvalidArgumentError(
            "La precicsion no puede ser un numero negativo"
          );

        return faker.datatype.number({
          max,
          min,
          precision,
        });
      },
      name: "Number",
      arguments: [
        {
          argument: "min",
          inputType: ARGUMENT_TYPE.NUMBER,
          description: "Valor mínimo a obtener. Por defecto tiene valor de 0",
        },
        {
          argument: "max",
          inputType: ARGUMENT_TYPE.NUMBER,
          description: "Valor máximo a obtener",
        },
        {
          argument: "precision",
          inputType: ARGUMENT_TYPE.FLOAT,
          description:
            "Presición del número resultante. Ejemplo: 0,01 --> 36.94 ",
        },
      ],
    },
    {
      exampleValue: faker.datatype.hexadecimal,
      getValue: (args) => faker.datatype.hexadecimal(Number(args.length)),
      name: "Hexadecimal",
      arguments: [
        {
          argument: "length",
          inputType: ARGUMENT_TYPE.NUMBER,
          description: "Tamaño máximo del código hexadecimal",
        },
      ],
    },
    {
      exampleValue: faker.datatype.float(),
      getValue: (args) => {
        const min = Number(args.min);
        const max = Number(args.max);
        const precision = Number(args.precision);

        if (min > max)
          throw new InvalidArgumentError(
            "El parametro min no puede ser mayor al max"
          );

        if (precision < 0)
          throw new InvalidArgumentError(
            "La precicsion no puede ser un numero negativo"
          );

        return faker.datatype.float({
          max,
          min,
          precision,
        });
      },
      name: "Float",
      arguments: [
        {
          argument: "min",
          inputType: ARGUMENT_TYPE.FLOAT,
          description: "Valor mínimo a obtener. Por defecto tiene valor de 0",
        },
        {
          argument: "max",
          inputType: ARGUMENT_TYPE.FLOAT,
          description: "Valor máximo a obtener",
        },
        {
          argument: "precision",
          inputType: ARGUMENT_TYPE.FLOAT,
          description:
            " Presición del número resultante. Ejemplo: 0,01 --> 36.94 ",
        },
      ],
    },
    {
      exampleValue: [
        [1, 0, 1, 1],
        [0, 0, 0, 1],
        [1, 1, 0, 0],
      ],
      getValue: (args) => {
        const x_size =
          Number(args.x_size) || faker.datatype.number({ min: 1, max: 10 });
        const y_size =
          Number(args.y_size) || faker.datatype.number({ min: 1, max: 10 });
        const min =
          Number(args.min) ||
          faker.datatype.number({ min: 1, max: args.max || 10 });
        const max =
          Number(args.max) || faker.datatype.number({ min: min, max: 100 });
        const precision =
          Number(args.precision) ||
          faker.datatype.number({ min: 0, max: 1, precision: 0.1 });

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

        return new Array(y_size).fill(0).map((el) => {
          return new Array(x_size).fill(0).map((el) => {
            let value;

            if (args.dataType === "Int")
              value = faker.datatype.number({
                min,
                max,
              });
            else if (args.dataType === "Float")
              value = faker.datatype.float({
                min,
                max,
                precision,
              });
            else
              value = faker.datatype.number({
                min,
                max,
              });

            return value;
          });
        });
      },
      name: "Matriz",
      arguments: [
        {
          argument: "x_size",
          inputType: ARGUMENT_TYPE.NUMBER,
          description: "Cantidad de columnas de la matriz",
        },
        {
          argument: "y_size",
          inputType: ARGUMENT_TYPE.NUMBER,
          description: "Cantidad de filas de la matriz",
        },
        {
          argument: "precision",
          inputType: ARGUMENT_TYPE.FLOAT,
          description: "",
        },
        {
          argument: "min",
          inputType: ARGUMENT_TYPE.FLOAT,
          description: "Valor mínimo que pueden tener los números de la matriz",
        },
        {
          argument: "max",
          inputType: ARGUMENT_TYPE.FLOAT,
          description: "Valor máximo que pueden tener los números de la matriz",
        },
        {
          argument: "dataType",
          inputType: ARGUMENT_TYPE.SELECT,
          selectValues: ["Int", "Float"],
          description: "Tipo de dato que tendrán los valores de la matriz",
        },
      ],
    },
    {
      name: "Custom Array",
      exampleValue: "[1, 'a', 93, 'Hello'] --> 'Hello'",
      arguments: [
        {
          argument: "array",
          inputType: ARGUMENT_TYPE.CUSTOM_ARRAY,
          description: "",
        },
      ],
      getValue: (args) => {
        if (Array.isArray(args.array)) {
          return randomChoiceList(args.array);
        } else return args.array;
      },
    },
  ];
};
