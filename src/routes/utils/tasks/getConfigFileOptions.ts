import { Request, Response } from "express";
import { FileConfigSchema } from "../../../shared/dataSchemas/ConfigGenerator/configSchema";

export const getConfigFileOptionsRoute = (req: Request, res: Response) => {
  res.json({ options: FileConfigSchema }).end();
};
