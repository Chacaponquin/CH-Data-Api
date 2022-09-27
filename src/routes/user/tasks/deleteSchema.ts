import { Request, Response } from "express";
import User from "../../../db/schemas/User";

export const deleteSchemaRoute = async (req: Request, res: Response) => {
  try {
    const schemaID = req.body.data.id as string;
    const currentUser = req.user as any;

    await User.findByIdAndUpdate(currentUser._id, {
      $pull: {
        datasetsSchemas: schemaID,
      },
    });

    res.json({}).end();
  } catch (error) {
    res.status(500).end();
  }
};
