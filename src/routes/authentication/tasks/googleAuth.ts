import { Response, Request } from "express";
import User from "../../../db/schemas/User";
import jwt from "jsonwebtoken";
import { LOGIN_METHODS } from "../../../shared/constants/LoginMethods.enum";

export const googleAuthRoute = async (req: Request, res: Response) => {
  try {
    const { name, email, picture } = req.user as any;

    const userExists = await User.findOne({ email });

    let token;
    if (!userExists) {
      const newUser = new User({
        email,
        image: picture,
        username: name,
        methodLogin: LOGIN_METHODS.GOOGLE,
      });

      await newUser.save();

      token = jwt.sign({ id: newUser._id }, process.env.SECRET_WORD as string);
    } else {
      token = jwt.sign(
        { id: userExists._id },
        process.env.SECRET_WORD as string
      );
    }

    res.cookie("jwt", token).redirect(process.env.CLIENT_URL as string);
  } catch (error) {
    res.status(500).json({ error }).end();
  }
};
