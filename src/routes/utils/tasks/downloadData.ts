import { Request, Response } from "express";
import path from "path";

export const downloadData = (req: Request, res: Response) => {
  const { file } = req.params;

  const filePath = path.join(__dirname, "../../../../data", file);

  res.download(filePath, (error) => {
    if (error) {
      console.log(error);
    }
  });
};
