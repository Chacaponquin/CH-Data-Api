import { faker } from "@faker-js/faker";
import {
  INPUT_ARGUMENT_TYPE,
  TypeOptionSchema,
} from "../../interfaces/fields.interface";

const NAME_FIELD_ARGUMENTS = [
  {
    argument: "gender",
    inputType: INPUT_ARGUMENT_TYPE.SELECT,
    selectValues: ["Male", "Female"],
  },
];

export const NameField = (): TypeOptionSchema[] => {
  return [
    {
      name: "Last Name",
      arguments: NAME_FIELD_ARGUMENTS,
      exampleValue: faker.name.lastName(),
      getValue: ({ gender }: any) => faker.name.lastName(gender.toLowerCase()),
    },
    {
      name: "Full Name",
      arguments: NAME_FIELD_ARGUMENTS,
      getValue: ({ gender }: any) =>
        faker.name.firstName(gender.toLowerCase()) +
        " " +
        faker.name.middleName(gender.toLowerCase()) +
        " " +
        faker.name.lastName(gender.toLowerCase()),
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
      getValue: ({ gender }: any) => faker.name.firstName(gender.toLowerCase()),
      exampleValue: faker.name.firstName(),
    },
    {
      name: "Middle Name",
      arguments: NAME_FIELD_ARGUMENTS,
      getValue: ({ gender }: any) =>
        faker.name.middleName(gender.toLowerCase()),
      exampleValue: faker.name.middleName(),
    },
    {
      name: "Prefix",
      arguments: NAME_FIELD_ARGUMENTS,
      getValue: ({ gender }: any) => faker.name.prefix(gender.toLowerCase()),
      exampleValue: faker.name.prefix(),
    },
    {
      name: "Suffix",
      getValue: () => faker.name.suffix(),
      exampleValue: faker.name.suffix(),
    },
  ];
};
