import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../../../db/schemas/User";
import jwt from "jsonwebtoken";
import { AuthInput } from "../interface/auth.interface";

export const createUserRoute = async (req: Request, res: Response) => {
  try {
    const { password, username, email } = req.body.data as AuthInput;

    const newPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ password: newPassword, username, email });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id },
      process.env.SECRET_WORD as string
    );

    res.json({ userToken: token }).end();
  } catch (error: any) {
    console.log(error);
    if (error.name === "MongoServerError")
      res.status(500).json({ error: "Ya existe este usuario" }).end();
    else res.status(500).end();
  }
};
