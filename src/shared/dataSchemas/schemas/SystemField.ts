import { faker } from "@faker-js/faker";
import { TypeOptionSchema } from "../../interfaces/fields.interface";

export const SystemField = (): TypeOptionSchema[] => {
  return [
    {
      exampleValue: faker.system.commonFileExt(),
      getValue: () => faker.system.commonFileExt(),
      name: "File Extension",
      arguments: [],
    },
    {
      exampleValue: faker.system.fileName(),
      getValue: () => faker.system.fileName(),
      name: "File Name",
      arguments: [],
    },
    {
      exampleValue: faker.system.commonFileType(),
      getValue: () => faker.system.commonFileType(),
      name: "File Type",
      arguments: [],
    },
    {
      exampleValue: faker.system.directoryPath(),
      getValue: () => faker.system.directoryPath(),
      name: "Directory Path",
      arguments: [],
    },
    {
      exampleValue: faker.system.filePath(),
      getValue: () => faker.system.filePath(),
      name: "File Path",
      arguments: [],
    },
    {
      exampleValue: faker.system.semver(),
      getValue: () => faker.system.semver(),
      name: "Sem Server",
      arguments: [],
    },
  ];
};
