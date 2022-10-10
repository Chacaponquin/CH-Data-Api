import { DATA_TYPES } from "../helpers/constants/types.enum";
import {
  ReturnDataset,
  DatasetField,
} from "../../socket/interfaces/datasets.interface";
import { ReturnValue } from "../interfaces/fields.interface";

export const FormatterData = {
  isCapitalized(value: string): boolean {
    let returnValue = true;

    if (!(value.toLowerCase() === value)) {
      for (let i = 0; i < value.length; i++) {
        if (value[i].toUpperCase() === value[i]) {
          if (i === value.length - 1 || i === 0) {
            returnValue = false;
            break;
          } else {
            if (
              value[i - 1].toUpperCase() === value[i - 1] ||
              value[i + 1].toUpperCase() === value[i + 1]
            ) {
              returnValue = false;
              break;
            }
          }
        }
        if (
          value[i] === " " ||
          value[i] != "_" ||
          value[i] != "-" ||
          value[i] != "(" ||
          value[i] != ")"
        ) {
          returnValue = false;
          break;
        }
      }
    }
    return returnValue;
  },

  capitalizeText(text: string): string {
    if (!this.isCapitalized(text)) {
      let returnString = "";
      let mayus = false;

      for (let i = 0; i < text.length; i++) {
        if (
          text[i] != " " &&
          text[i] != "_" &&
          text[i] != "-" &&
          text[i] != "(" &&
          text[i] != ")"
        ) {
          const isOnlyMayus: boolean =
            text[i].toUpperCase() === text[i] &&
            i > 0 &&
            i < text.length - 1 &&
            text[i - 1].toLowerCase() === text[i - 1] &&
            text[i + 1].toLowerCase() === text[i + 1];

          if (isOnlyMayus) mayus = true;

          returnString = returnString.concat(
            mayus ? text[i].toUpperCase() : text[i].toLowerCase()
          );
          mayus = false;
        } else {
          mayus = true;
          continue;
        }
      }

      return returnString;
    } else return text;
  },

  getObjectSchema(fieldsData: DatasetField[]): any {
    let object = {};

    for (const field of fieldsData) {
      const { name, id, dataType } = field;

      if (dataType.type === DATA_TYPES.SINGLE_VALUE) {
        object = {
          ...object,
          [name]: {
            type: dataType.fieldType.parent + "/" + dataType.fieldType.type,
            isArray: field.isArray,
            args: dataType.fieldType.args,
          },
        };
      }
    }

    return object;
  },

  transformReturnDataToObject(data: ReturnDataset<ReturnValue>[]): {
    [p: string]: {
      [k: string]: ReturnValue | ReturnValue[];
    }[];
  } {
    let returnObject: {
      [p: string]: {
        [k: string]: ReturnValue | ReturnValue[];
      }[];
    } = {};

    for (const dat of data) {
      returnObject = { ...returnObject, [dat.name]: dat.documents };
    }

    return returnObject;
  },

  capitalizeMayusText(text: string): string {
    let result = this.capitalizeText(text);
    let newResult = "";

    for (let i = 0; i < result.length; i++) {
      newResult = newResult.concat(
        i === 0 ? result[i].toUpperCase() : result[i]
      );
    }

    return newResult;
  },
};
