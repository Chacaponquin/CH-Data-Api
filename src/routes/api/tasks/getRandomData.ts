import { Request, Response } from "express";
import { DataFields } from "../../../shared/classes/DataFields";
import { FormatterData } from "../../../shared/classes/FormatterData";
import { faker } from "@faker-js/faker";
import { InvalidArgumentError } from "../../../shared/errors/InvalidArgument";

export const getRandomDataRoute = async (req: Request, res: Response) => {
  try {
    const { parent, field } = req.params;
    const { isArray, limit, ...queryArguments } = req.query;

    const fields = await new DataFields().getFields();

    const parentFound = fields.find((f) => {
      return (
        FormatterData.capitalizeText(f.parent) ===
        FormatterData.capitalizeText(parent)
      );
    });

    if (parentFound) {
      const fieldFound = parentFound.fields.find((f) => {
        return (
          FormatterData.capitalizeText(f.name) ===
          FormatterData.capitalizeText(field)
        );
      });

      if (fieldFound) {
        let value: any;

        if (isArray) {
          value = [];

          const newLimit = limit
            ? limit
            : faker.datatype.number({ min: 2, max: 100 });

          for (let i = 0; i < newLimit; i++) {
            value.push(await fieldFound.getValue(queryArguments));
          }
        } else value = await fieldFound.getValue(queryArguments);

        res.json(value).end();
      } else res.status(404).end();
    } else res.status(404).end();
  } catch (error: any) {
    console.log(error);
    if (error instanceof InvalidArgumentError) {
      res.status(500).json({ error: error.message }).end();
    } else res.status(500).json({ error: null }).end();
  }
};
