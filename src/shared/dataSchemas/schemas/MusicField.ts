import { faker } from "@faker-js/faker";
import { TypeOptionSchema } from "../../interfaces/fields.interface";

export const MusicField = (): TypeOptionSchema[] => {
  return [
    {
      name: "Gender",
      getValue: () => faker.music.genre(),
      exampleValue: faker.music.genre(),
      arguments: [],
    },
    {
      name: "Song Name",
      getValue: () => faker.music.songName(),
      exampleValue: faker.music.songName(),
      arguments: [],
    },
  ];
};
