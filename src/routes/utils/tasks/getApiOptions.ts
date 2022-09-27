import { Request, Response } from "express";
import { DataFields } from "../../../shared/classes/DataFields";

export const getApiOptionsRoute = async (req: Request, res: Response) => {
  try {
    const options = await DataFields.getApiSections();
    res.json(options).end();
  } catch (error) {
    res.status(500).end();
  }
};
