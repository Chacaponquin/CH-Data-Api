import { Response, Request } from "express";
import User from "../../../db/schemas/User";

export const getMySchemasRoute = async (req: Request, res: Response) => {
  try {
    const currentUser = req.user as any;

    const { datasetsSchemas } = (await User.findById(currentUser._id).populate(
      "datasetsSchemas"
    )) as any;

    res.json(datasetsSchemas).end();
  } catch (error) {
    res.status(500).end();
  }
};
