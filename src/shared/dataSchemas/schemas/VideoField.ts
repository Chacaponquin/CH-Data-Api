import Video from "../../../db/schemas/Video";
import { randomChoiceList } from "../../helpers/randomChoice";
import { TypeOptionSchema } from "../../interfaces/fields.interface";

export const VideoField = async (): Promise<TypeOptionSchema[]> => {
  const allVideos = await Video.find();

  return [
    ...allVideos.map((el) => {
      return {
        name: el.topic,
        exampleValue: randomChoiceList(el.videos as string[]),
        getValue: () => randomChoiceList(el.videos as string[]),
        arguments: [],
      };
    }),
  ];
};
