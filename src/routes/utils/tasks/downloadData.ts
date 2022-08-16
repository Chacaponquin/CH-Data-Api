import { Request, Response } from "express";
import path from "path";

export const downloadData = (req: Request, res: Response) => {
  const { file } = req.params;

  res.download(path.join(__dirname, "../../../../public", file));
};
