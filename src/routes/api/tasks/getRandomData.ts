import { Request, Response } from "express";
import { DataFields } from "../../../shared/classes/OptionController";
import { FormatterData } from "../../../shared/classes/FormatterData";
import { faker } from "@faker-js/faker";
import { InvalidArgumentError } from "../../../shared/errors/InvalidArgument";
import {
  FieldArgument,
  ReturnValue,
} from "../../../shared/interfaces/fields.interface";

export const getRandomDataRoute = async (req: Request, res: Response) => {
  try {
    const { parent, field } = req.params;
    const { isArray, limit, ...queryArguments } = req.query;

    const fields = await DataFields.getFields();

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
        let returnValue: ReturnValue | ReturnValue[];

        if (isArray) {
          returnValue = [] as ReturnValue[];

          const newLimit = limit
            ? limit
            : faker.datatype.number({ min: 2, max: 50 });

          for (let i = 0; i < newLimit; i++) {
            returnValue.push(
              await fieldFound.getValue(
                queryArguments as { [key: string]: FieldArgument }
              )
            );
          }
        } else
          returnValue = await fieldFound.getValue(
            queryArguments as { [key: string]: FieldArgument }
          );

        res.json(returnValue).end();
      } else res.status(404).end();
    } else res.status(404).end();
  } catch (error: any) {
    console.log(error);
    if (error instanceof InvalidArgumentError) {
      res.status(500).json({ error: error.message }).end();
    } else res.status(500).json({ error: null }).end();
  }
};
