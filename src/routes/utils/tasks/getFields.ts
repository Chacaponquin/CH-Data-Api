import { Response, Request } from "express";
import { DataFields } from "../../../shared/classes/DataFields";

export const getFieldsRoute = async (req: Request, res: Response) => {
  const fields = await new DataFields().getFields();

  res.json({ fields: fields });
};
