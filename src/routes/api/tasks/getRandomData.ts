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
        chaca.utils.capitalizeText(f.parent).toLowerCase() ===
        chaca.utils.capitalizeText(parent).toLowerCase()
      );
    });

    if (parentFound) {
      const optionFound = parentFound.options.find((f) => {
        return (
          chaca.utils.capitalizeText(f.name).toLowerCase() ===
          chaca.utils.capitalizeText(field).toLowerCase()
        );
      });

      if (optionFound) {
        let returnValue;

        if (isArray) {
          returnValue = [];

          const newLimit =
            typeof limit === "number" && limit > 0
              ? limit
              : schemas.dataType.number().getValue({ min: 2, max: 50 });

          for (let i = 0; i < newLimit; i++) {
            returnValue.push(optionFound.getValue(queryArguments));
          }
        } else returnValue = optionFound.getValue(queryArguments);

        res.json(returnValue).end();
      } else {
        res.status(404).end();
      }
    } else res.status(404).end();
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: null }).end();
  }
};
