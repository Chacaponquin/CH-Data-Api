import { Node, NodeConfig } from "./Node";
import { chaca } from "chaca";
import { ChacaDatasetError } from "../../errors/ChacaDatasetError";

export class CustomValueNode extends Node {
  constructor(config: NodeConfig, public readonly code: string) {
    super(config);
  }

  public getValue(fields: { [key: string]: unknown }): unknown {
    const contentCode: string = this.code.slice(
      this.code.indexOf("{") + 1,
      this.code.lastIndexOf("}")
    );

    try {
      const func = new Function(contentCode);
      const value = func(fields, chaca.utils);

      if (value === undefined)
        throw new ChacaDatasetError(
          `The custom field ${this.name} returns undefined`
        );
      else return value;
    } catch (error: any) {
      throw new ChacaDatasetError(
        `Error in function of field ${this.name}\n ${error.message}`
      );
    }
  }
}
