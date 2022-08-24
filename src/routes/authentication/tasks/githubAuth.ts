import { Response, Request } from "express";
import User from "../../../db/schemas/User";
import { LOGIN_METHODS } from "../../../shared/helpers/constants/LoginMethods";
import jwt from "jsonwebtoken";

export const githubAuthRoute = async (req: Request, res: Response) => {
  try {
    const { login, avatar_url } = req.user as any;

    const foundUser = await User.findOne({ username: login });

    let token;
    if (!foundUser) {
      const newUser = new User({
        methodLogin: LOGIN_METHODS.GITHUB,
        username: login,
        image: avatar_url,
      });

      await newUser.save();

      token = jwt.sign({ id: newUser._id }, process.env.SECRET_WORD as string);
    } else {
      token = jwt.sign(
        { id: foundUser._id },
        process.env.SECRET_WORD as string
      );
    }

    console.log(token);

    res
      .status(200)
      .cookie("jwt", token)
      .redirect(process.env.CLIENT_URL as string);
  } catch (error) {
    res.status(500).json({ error });
  }
};
