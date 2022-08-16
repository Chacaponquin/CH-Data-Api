import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../../db/schemas/User";

export const createContextUser = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization;
      const user = jwt.verify(token, process.env.SECRET_WORD as string) as any;

      if (user) {
        const userFound = await User.findById(user.id);
        if (userFound) req.user = userFound;
      }
    }

    next();
  } catch (error) {
    next();
  }
};
