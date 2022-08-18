import { faker } from "@faker-js/faker";
import Images from "../../../../db/schemas/Images";
import { CreateFieldObjectError } from "../../../errors/CreateFieldObjectError";
import { randomChoiceList } from "../../../helpers/randomChoice";
import { TypeOptionSchema } from "../../../interfaces/fields.interface";

export const ImageField = async (): Promise<TypeOptionSchema[]> => {
  let allTopics: TypeOptionSchema[] = [];

  await Images.find()
    .then((data) => {
      allTopics = data.map((el) => {
        return {
          name: el.topic,
          exampleValue: randomChoiceList(el.images),
          getValue: () => randomChoiceList(el.images),
          arguments: [],
        };
      });
    })
    .catch((err) => {
      throw new CreateFieldObjectError("Image");
    });

  return [
    ...allTopics,
    {
      name: "Avatar Photo",
      exampleValue: faker.image.avatar(),
      getValue: () => faker.image.avatar(),
      arguments: [],
    },
    {
      name: "Avatar Icon",

      exampleValue: `https://api.multiavatar.com/${Number(
        Math.random() * 1000
      ).toFixed(0)}.svg`,
      getValue: () =>
        `https://api.multiavatar.com/${Number(Math.random() * 1000).toFixed(
          0
        )}.svg`,
      arguments: [],
    },
  ];
};
