import { Request, Response } from "express";
import { FileConfig } from "../../../shared/constants/FileConfig";

export const getConfigFileOptionsRoute = (req: Request, res: Response) => {
  res.json({ config: FileConfig }).end();
};
