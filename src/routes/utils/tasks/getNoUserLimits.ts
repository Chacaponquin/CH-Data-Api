import { Response, Request } from "express";
import { NO_USER_LIMITS } from "../../../shared/constants/UserLimits.enum";

export const getNoUserLimitsRoute = (req: Request, res: Response) => {
  res.json({ NO_USER_LIMITS }).end();
};
