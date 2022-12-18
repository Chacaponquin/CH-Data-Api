import { chaca, schemas } from "chaca";
import { Request, Response } from "express";
import { OptionsController } from "../../../shared/classes/OptionController";

export const getRandomDataRoute = async (req: Request, res: Response) => {
  try {
    const { parent, field } = req.params;
    const { isArray, limit, ...queryArguments } = req.query;

    const options = OptionsController.getApiOptions();

    const parentFound = options.find((f) => {
      return (
        chaca.utils.capitalizeText(f.parent) ===
        chaca.utils.capitalizeText(parent)
      );
    });

    if (parentFound) {
      const fieldFound = parentFound.options.find((f) => {
        return (
          chaca.utils.capitalizeText(f.name) ===
          chaca.utils.capitalizeText(field)
        );
      });

      if (fieldFound) {
        let returnValue;

        if (isArray) {
          returnValue = [];

          const newLimit = limit
            ? limit
            : schemas.dataType.number().getValue({ min: 2, max: 50 });

          for (let i = 0; i < newLimit; i++) {
            returnValue.push(fieldFound.getValue(queryArguments));
          }
        } else returnValue = fieldFound.getValue(queryArguments);

        res.json(returnValue).end();
      } else res.status(404).end();
    } else res.status(404).end();
  } catch (error: any) {
    res.status(500).json({ error: null }).end();
  }
};
