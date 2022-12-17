import { chaca } from "chaca";
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
    res.status(500).json({ error: null }).end();
  }
};
