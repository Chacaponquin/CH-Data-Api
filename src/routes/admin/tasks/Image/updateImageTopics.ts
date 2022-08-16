import { Response, Request } from "express";
import Images from "../../../../db/schemas/Images";
import { axiosUnplashInstance } from "../../helpers/axiosConfig";

interface ImageInf {
  title: string;
  slug: string;
  id: string;
  images: string[];
}

export const updateImageTopics = async (req: Request, res: Response) => {
  let result: ImageInf[] = [];

  let stop = false;
  let i = 0;

  try {
    while (!stop) {
      const { data } = await axiosUnplashInstance.get("/topics", {
        params: { page: i, per_page: 10 },
      });

      const titles: ImageInf[] = data.map((el: any) => {
        return { title: el.title, id: el.id, slug: el.slug, images: [] };
      });

      result.push(...titles);

      if (titles.length === 0 || i > 10) stop = true;

      i++;
    }

    const definitiveData = [];
    const dataToTransform = [...new Set(result.map((el: any) => el.title))];
    for (let i = 0; i < dataToTransform.length; i++) {
      const value = result.find((el: any) => el.title === dataToTransform[i]);
      if (value) definitiveData.push(value);
    }

    const newResult: ImageInf[] = [];
    for (let i = 0; i < definitiveData.length; i++) {
      const { data: topicPhotos } = await axiosUnplashInstance.get(
        `/topics/${definitiveData[i].slug}/photos`
      );

      definitiveData[i].images = topicPhotos.map((el: any) => el.urls.full);
      newResult.push(definitiveData[i]);
    }

    //BORRAR COLECCION
    await Images.deleteMany({});

    for (let x = 0; x < newResult.length; x++) {
      const newImageTopic = new Images({
        topic: newResult[x].title,
        images: [...newResult[x].images],
      });

      await newImageTopic.save();
    }

    res.json({ result: await Images.find() }).end();
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: {} }).end();
  }
};
