import { Request, Response } from "express";
import UserMessage from "../../../db/schemas/UserMessage";

export const createUserMessage = async (req: Request, res: Response) => {
  try {
    const message = req.body.data as any;

    const newMessage = new UserMessage({
      ...message,
      userEmail: message.email,
    });

    await newMessage.save();
    res.status(200).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};
