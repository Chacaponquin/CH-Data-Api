import { CreateCustomFieldError } from "../errors/CreateCustomFieldError";
import { CustomCodeInvalidError } from "../errors/CustomCodeInvalidError";
import { CODE_TYPES, CustomDataType } from "../interfaces/datasets.interface";

export class CreateCustomValue {
  private doc: any;
  private dataType: CustomDataType;

  constructor(doc: any, dataType: CustomDataType) {
    this.doc = doc;
    this.dataType = dataType;
  }

  public generateValue(): any {
    switch (this.dataType.codeType) {
      case CODE_TYPES.JAVASCRIPT: {
        const functionCode = this.dataType.code;

        const contentCode: string = functionCode.slice(
          functionCode.indexOf("{") + 1,
          functionCode.lastIndexOf("}")
        );

        try {
          const func = new Function(contentCode);
          const value = func.apply({
            ...this.doc,
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
