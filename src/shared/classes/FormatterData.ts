import {
  ReturnDataset,
  DatasetField,
} from "../../socket/main/interfaces/datasets.interface";

export const FormatterData = {
  transformReturnData(data: ReturnDataset[]): any {},
  capitalizeText(text: string): string {
    let returnString = "";
    let mayus = false;

    for (let i = 0; i < text.length; i++) {
      if (text[i] != " " && text[i] != "_" && text[i] != "-") {
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
  },
  getObjectSchema(fieldsData: DatasetField[]): any {
    let object = {};

    for (const field of fieldsData) {
      const { name, id, ...rest } = field;

      let argsObj = {};
      if (field.args && field.args.length) {
        for (const arg of field.args) {
          argsObj = { ...argsObj, [arg.field]: arg.value };
        }
      }

      object = {
        ...object,
        [name]: {
          type: field.type.parent + "/" + field.type.type,
          isArray: field.isArray,
          args: argsObj,
        },
      };
    }

    return object;
  },
};
