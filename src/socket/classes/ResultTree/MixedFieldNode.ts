import { FieldNode } from "./FieldNode";

export class MixedFieldNode extends FieldNode {
  public nodes: Array<FieldNode> = [];

  public getValueByLocation(location: string[]): unknown {
    if (location.length === 0) return this.getValue();
    else {
      let found: unknown = undefined;
      for (let i = 0; i < this.nodes.length && found === undefined; i++) {
        if (this.nodes[i].id === location[0])
          found = this.nodes[i].getValueByLocation(location.slice(1));
      }
      return found;
    }
  }

  public setNodeByLocation(node: FieldNode, location: string[]): boolean {
    if (location.length === 0) {
      this.nodes.push(node);
      return true;
    } else {
      let inserted = false;

      for (let i = 0; i < this.nodes.length && !inserted; i++) {
        const n = this.nodes[i];
        if (location[0] === n.id && n instanceof MixedFieldNode)
          inserted = n.setNodeByLocation(node, location.slice(1));
      }

      return inserted;
    }
  }

  public getValue(): unknown {
    let resultObject = {};

    this.nodes.forEach((n) => {
      resultObject = { ...resultObject, [n.name]: n.getValue() };
    });

    return resultObject;
  }
}
