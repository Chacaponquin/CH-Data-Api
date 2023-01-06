import { InputDatasetField } from "../../interfaces/datasets.interface";
import { TreeUtils } from "../../utils/TreeUtils";
import { Node, MixedValueNode } from "./";

export class RootNode {
  public n: Array<Node> = [];

  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly limit: number
  ) {}

  public get nodes() {
    return this.n;
  }

  public insertNode(node: Node): void {
    this.nodes.push(node);
    this.n = TreeUtils.orderFieldsByPriority(this.n);
  }

  public insertDatasetsFields(fields: InputDatasetField[]) {
    for (const f of fields) {
      const newNode = TreeUtils.createNodeByDatatype(f);
      this.insertNode(newNode);
    }
  }

  public insertNodeByLocation(node: Node, location: string[]): boolean {
    if (location.length === 0) {
      this.insertNode(node);
      return true;
    } else {
      let inserted = false;

      for (let i = 0; i < this.nodes.length && !inserted; i++) {
        const n = this.nodes[i];
        if (n instanceof MixedValueNode && n.id === location[0]) {
          inserted = n.insertNodeByLocation(node, location.slice(1));
        }
      }

      return inserted;
    }
  }
}
