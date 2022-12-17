import { Response, Request } from "express";
import User from "../../../db/schemas/User";
import { WrongUser } from "../errors/WrongUser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LOGIN_METHODS } from "../../../shared/constants/LoginMethods.enum";

export const signInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body.data;

    const userFound = await User.findOne({ email: email });

    if (userFound) {
      if (userFound.password && LOGIN_METHODS.EMAIL === userFound.methodLogin) {
        const correctPassword = await bcrypt.compare(
          password,
          userFound.password as string
        );

        if (correctPassword) {
          const token = jwt.sign(
            { id: userFound._id },
            process.env.SECRET_WORD as string
          );

          res.json({ token }).end();
        } else throw new WrongUser();
      } else throw new WrongUser();
    } else throw new WrongUser();
  } catch (error) {
    if (error instanceof WrongUser)
      res.status(404).json({ error: error.message }).end();
    else res.status(500).json({ message: "Hubo un error" }).end();
  }
};
