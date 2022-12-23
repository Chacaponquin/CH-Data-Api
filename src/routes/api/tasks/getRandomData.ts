import { chaca, schemas } from "chaca";
import { Request, Response } from "express";
import { OptionsController } from "../../../shared/classes/OptionController";

export const getRandomDataRoute = async (req: Request, res: Response) => {
  try {
    const { parent, option } = req.params;
    const { isArray, ...queryArguments } = req.query;

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
          chaca.utils.capitalizeText(option).toLowerCase()
        );
      });

      if (optionFound) {
        let returnValue;

        if (isArray) {
          returnValue = [];

          const newLimit =
            Number(isArray) && Number(isArray) > 0
              ? Number(isArray)
              : schemas.dataType.number().getValue({ min: 2, max: 50 });

          for (let i = 0; i < newLimit; i++) {
            returnValue.push(optionFound.getValue(queryArguments));
          }
        } else returnValue = optionFound.getValue(queryArguments);

        res.json(returnValue).end();
      } else {
        res
          .status(404)
          .json({
            error: `The type ${option} do not exists on parent ${parent}`,
          })
          .end();
      }
    } else
      res
        .status(404)
        .json({ error: `The parent ${parent} do not exists` })
        .end();
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: null }).end();
  }
};
