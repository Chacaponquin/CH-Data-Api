import { chaca } from "chaca";
import { ApiOption, OptionSchema } from "../interfaces/fields.interface";
import Options from "../options";

export abstract class OptionsController {
  public static getOptionsArray() {
    let returnOptions = [] as { parent: string; options: OptionSchema[] }[];

    for (const [key, options] of Object.entries(Options)) {
      returnOptions.push({ parent: key, options });
    }

    return returnOptions;
  }

  public static getApiOptions(): ApiOption[] {
    let returnOptions = [] as ApiOption[];

    for (const [key, options] of Object.entries(Options)) {
      returnOptions.push({
        options: options.map((el) => {
          const parent = chaca.utils.capitalizeText(key);
          const name = chaca.utils.capitalizeText(el.name);
          const route = `/api/${parent}/${name}`;

          return { ...el, route };
        }),
        parent: key,
      });
    }

    return returnOptions;
  }
}
