import { ReturnDataset, DatasetField } from "../interfaces/datasets.interface";

export const FormatterData = {
  transformReturnData(data: ReturnDataset[]): any {},
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
