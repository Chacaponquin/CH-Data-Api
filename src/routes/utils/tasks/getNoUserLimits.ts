import { Response, Request } from "express";
import { NO_USER_LIMITS } from "../../../shared/helpers/constants/UserLimits";

export const getNoUserLimitsRoute = (req: Request, res: Response) => {
  res.json({ limits: NO_USER_LIMITS }).end();
};
