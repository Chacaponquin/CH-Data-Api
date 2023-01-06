import { OptionsController } from "../../../shared/classes/OptionController";
import { OptionSchema } from "../../../shared/interfaces/fields.interface";
import { ChacaDatasetError } from "../../errors/ChacaDatasetError";
import { InputArguments } from "../../interfaces/dataType.interface";
import { Node } from "./";
import { NodeConfig } from "./Node";

export class SchemaValueNode extends Node {
  private schema: OptionSchema;

  constructor(
    config: NodeConfig,
    private readonly schemaInfo: { parent: string; option: string },
    private readonly args: InputArguments
  ) {
    super(config);
    this.schema = this.filterOption();
  }

  public getValue() {
    return this.schema.getValue(this.args);
  }

  public resolve(): unknown {
    return this.schema.getValue(this.args);
  }

  private filterOption(): OptionSchema {
    const options = OptionsController.getOptionsArray();

    const findParent = options.find((o) => {
      return o.parent === this.schemaInfo.parent;
    });

    if (findParent) {
      const findSchema = findParent.options.find(
        (o) => o.name === this.schemaInfo.option
      );

      if (findSchema) return findSchema;
      else
        throw new ChacaDatasetError(`${this.name} not have a correct schema`);
    } else {
      throw new ChacaDatasetError(`'${this.name}' not have a correct schema`);
    }
  }
}
