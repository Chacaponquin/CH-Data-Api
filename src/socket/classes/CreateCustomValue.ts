import { randomChoiceList } from "../../shared/helpers/randomChoice";
import { ReturnValue } from "../../shared/interfaces/fields.interface";
import { CODE_TYPES } from "../../shared/helpers/constants/types.enum";
import { CreateCustomFieldError } from "../errors/CreateCustomFieldError";
import { CustomCodeInvalidError } from "../errors/CustomCodeInvalidError";
import { DatasetField } from "../interfaces/datasets.interface";
import { CustomDataType } from "../interfaces/dataType.interface";

export class CreateCustomValue {
  private doc: DatasetField<CustomDataType>;

  constructor(doc: DatasetField<CustomDataType>) {
    this.doc = doc;
  }

  public async generateValue(): Promise<ReturnValue> {
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
            oneOfArray: randomChoiceList,
          });
          console.log(value);

          return value;
        } catch (error) {
          throw new CreateCustomFieldError();
        }
      }
      default:
        throw new CustomCodeInvalidError();
    }
  }
}
