import { InputDatasetField } from "../../interfaces/datasets.interface";
import { TreeUtils } from "../../utils/TreeUtils";
import { Node, NodeConfig } from "./Node";

export class MixedValueNode extends Node {
  private n: Array<Node> = [];

  constructor(config: NodeConfig) {
    super(config);
  }

  public get nodes() {
    return this.n;
  }

  public insertNode(node: Node) {
    this.n.push(node);
    this.n = TreeUtils.orderFieldsByPriority(this.n);
  }

  public insertNodeByLocation(node: Node, location: string[]): boolean {
    if (location.length === 0) {
      this.insertNode(node);
      return true;
    } else {
      let inserted = false;

      for (let i = 0; i < this.n.length && !inserted; i++) {
        const n = this.n[i];
        if (n.id === location[0] && n instanceof MixedValueNode) {
          inserted = n.insertNodeByLocation(node, location.slice(1));
        }
      }

      return inserted;
    }
  }

  public insertSubFields(fields: InputDatasetField[]) {
    for (const f of fields) {
      const newNode = TreeUtils.createNodeByDatatype(f);
      this.insertNode(newNode);
    }
  }
}
