import { faker } from "@faker-js/faker";
import { TypeOptionSchema } from "../../../interfaces/fields.interface";

export const JobField = (): TypeOptionSchema[] => {
  return [
    {
      name: "Job Area",
      getValue: () => faker.name.jobArea(),
      exampleValue: faker.name.jobDescriptor(),
      arguments: [],
    },
    {
      name: "Job Descriptor",
      getValue: () => faker.name.jobDescriptor(),
      exampleValue: faker.name.jobDescriptor(),
      arguments: [],
    },
    {
      name: "Job Title",
      getValue: () => faker.name.jobTitle(),
      exampleValue: faker.name.jobDescriptor(),
      arguments: [],
    },
    {
      name: "Job Type",
      getValue: () => faker.name.jobType(),
      exampleValue: faker.name.jobDescriptor(),
      arguments: [],
    },
  ];
};
