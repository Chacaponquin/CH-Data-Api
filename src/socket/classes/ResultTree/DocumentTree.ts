import { FieldNode } from "./FieldNode";
import { MixedFieldNode } from "./MixedFieldNode";

export class DocumentTree {
  public fields: Array<FieldNode> = [];

  constructor() {}

  public getDataObject(): { [key: string]: unknown | unknown[] } {
    let returnObject = {};

    this.fields.forEach((f) => {
      returnObject = { ...returnObject, [f.name]: f.getValue() };
    });

    return returnObject;
  }

  public setNodeByLocation(node: FieldNode, location: string[]) {
    if (location.length === 0) {
      this.fields.push(node);
    } else {
      let inserted = false;

      for (let i = 0; i < this.fields.length && !inserted; i++) {
        const field = this.fields[i];
        if (field.id === location[0] && field instanceof MixedFieldNode)
          inserted = field.setNodeByLocation(node, location.slice(1));
      }
    }
  }

  public getValueByLocation(location: string[]): unknown {
    let found: unknown = undefined;
    for (let i = 0; i < this.fields.length && found === undefined; i++) {
      if (location[0] === this.fields[i].id)
        found = this.fields[i].getValueByLocation(location.slice(1));
    }
    return found;
  }
}
