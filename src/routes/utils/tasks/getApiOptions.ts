import { Response, Request } from "express";
import { OptionsController } from "../../../shared/classes/OptionController";

export const getApiOptions = async (req: Request, res: Response) => {
  res.json(OptionsController.getApiOptions());
};
