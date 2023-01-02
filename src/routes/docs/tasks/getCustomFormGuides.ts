import { Request, Response } from "express";
import fs from "fs";
import path from "path";

export const getCustomFormGuides = (req: Request, res: Response) => {
  fs.readFile(
    path.join(__dirname, "../../../docs/customForm/CustomFormDoc.md"),
    "utf8",
    (err, data) => {
      if (err) {
        res.sendStatus(500).end();
      } else {
        res.send(data).end();
      }
    }
  );
};
