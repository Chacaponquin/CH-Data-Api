import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import User from "../../../db/schemas/User";

export const getUserByToken = async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;

  try {
    if (token) {
      const user = jwt.verify(token, process.env.SECRET_WORD as string) as any;

      if (user) {
        const userFound = await User.findById(user.id).select("username");

        if (userFound) {
          res.json({ user: userFound }).end();
        } else throw new Error("No se ha encontrado un usuario");
      } else throw new Error("Token no valido");
    } else res.json({ user: null }).end();
  } catch (error: any) {
    if (error instanceof jwt.TokenExpiredError) res.status(401).end();
    else res.json({ user: null }).end();
  }
};
