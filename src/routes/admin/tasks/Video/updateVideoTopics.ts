import { Request, Response } from "express";
import Images from "../../../../db/schemas/Images";
import Video from "../../../../db/schemas/Video";
import { FormatterData } from "../../../../shared/classes/FormatterData";
import { axiosPexelsInstance } from "../../helpers/axiosConfig";

export const updateVideoTopicsRoute = async (req: Request, res: Response) => {
  try {
    const images = await Images.find();
    await Video.deleteMany({});

    const topics = images.map((el) => el.topic);

    let resultData = [];
    for (let i = 0; i < topics.length; i++) {
      const { data } = await axiosPexelsInstance.get("/videos/search", {
        params: {
          query: FormatterData.capitalizeText(topics[i]),
          per_page: 80,
          page: 1,
        },
      });

      resultData.push({
        topic: topics[i],
        videos: data.videos.map((el: any) => el.video_files[0].link),
      });
    }

    for (const video of resultData) {
      const newVideo = new Video(video);
      await newVideo.save();
    }

    res.json(resultData).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error }).end();
  }
};
