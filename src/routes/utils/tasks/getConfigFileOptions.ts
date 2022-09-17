import { Request, Response } from "express";
import { FileConfigSchema } from "../../../shared/helpers/constants/fileConfigSchema";

export const getConfigFileOptionsRoute = (req: Request, res: Response) => {
  res.json({ options: FileConfigSchema }).end();
};
