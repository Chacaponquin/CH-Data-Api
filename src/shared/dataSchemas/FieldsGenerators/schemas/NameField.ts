import { faker } from "@faker-js/faker";
import { TypeOptionSchema } from "../../../interfaces/fields.interface";
import { ARGUMENT_TYPE } from "../../../interfaces/fieldsTypes.enum";

const NAME_FIELD_ARGUMENTS = [
  {
    argument: "gender",
    inputType: ARGUMENT_TYPE.SELECT,
    selectValues: ["Male", "Female"],
    description: "Género que tendra el nombre a generar",
  },
];

export const NameField = (): TypeOptionSchema[] => {
  return [
    {
      name: "Last Name",
      arguments: NAME_FIELD_ARGUMENTS,
      exampleValue: faker.name.lastName(),
      getValue: ({ gender }: any) =>
        faker.name.lastName(gender ? gender.toLowerCase() : undefined),
    },
    {
      name: "Full Name",
      arguments: NAME_FIELD_ARGUMENTS,
      getValue: ({ gender }: any) =>
        faker.name.firstName(gender ? gender.toLowerCase() : undefined) +
        " " +
        faker.name.middleName(gender ? gender.toLowerCase() : undefined) +
        " " +
        faker.name.lastName(gender ? gender.toLowerCase() : undefined),
      exampleValue:
        faker.name.firstName() +
        " " +
        faker.name.middleName() +
        " " +
        faker.name.lastName(),
    },
    {
      name: "First Name",
      arguments: NAME_FIELD_ARGUMENTS,
      getValue: ({ gender }: any) =>
        faker.name.firstName(gender ? gender.toLowerCase() : undefined),
      exampleValue: faker.name.firstName(),
    },
    {
      name: "Middle Name",
      arguments: NAME_FIELD_ARGUMENTS,
      getValue: ({ gender }: any) =>
        faker.name.middleName(gender ? gender.toLowerCase() : undefined),
      exampleValue: faker.name.middleName(),
    },
    {
      name: "Prefix",
      arguments: NAME_FIELD_ARGUMENTS,
      getValue: ({ gender }: any) =>
        faker.name.prefix(gender ? gender.toLowerCase() : undefined),
      exampleValue: faker.name.prefix(),
    },
    {
      name: "Suffix",
      getValue: () => faker.name.suffix(),
      exampleValue: faker.name.suffix(),
      arguments: [],
    },
  ];
};
