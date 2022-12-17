import { CODE_TYPES } from "../../shared/constants/Types.enum";
import { InputDatasetField } from "../interfaces/datasets.interface";
import { CustomDataType } from "../interfaces/dataType.interface";
import { chaca } from "chaca";
import { ChacaDatasetError } from "../errors/ChacaDatasetError";

export class CreateCustomValue {
  constructor(private readonly doc: InputDatasetField<CustomDataType>) {}

  public generateValue(): any {
    switch (this.doc.dataType.codeType) {
      case CODE_TYPES.JAVASCRIPT: {
        const functionCode = this.doc.dataType.code;

        const contentCode: string = functionCode.slice(
          functionCode.indexOf("{") + 1,
          functionCode.lastIndexOf("}")
        );

        try {
          const func = new Function(contentCode);
          const value = func.apply({
            ...this.doc,
            oneOfArray: chaca.utils.oneOfArray,
          });

          return value;
        } catch (error) {
          throw new ChacaDatasetError(
            `Error in function of field ${this.doc.name}`
          );
        }
      }
      default:
        throw new ChacaDatasetError(
          `${this.doc.dataType.codeType} is not a available code extension for a function`
        );
    }
  }
}
