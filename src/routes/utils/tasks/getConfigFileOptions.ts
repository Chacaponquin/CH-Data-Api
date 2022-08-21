import { Request, Response } from "express";
import { FileConfigSchema } from "../../../shared/dataSchemas/ConfigGenerator/fileConfigSchema";

export const getConfigFileOptionsRoute = (req: Request, res: Response) => {
  res.json({ options: FileConfigSchema }).end();
};
