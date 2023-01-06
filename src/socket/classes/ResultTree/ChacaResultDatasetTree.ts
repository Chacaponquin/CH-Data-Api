import { chaca } from "chaca";
import { ChacaDatasetError } from "../../errors/ChacaDatasetError";
import { ReturnDataset } from "../../interfaces/datasets.interface";
import { DocumentTree } from "./DocumentTree";
import { FieldNode } from "./FieldNode";

export class ChacaResultDatasetTree {
  private resultDocuments: Array<DocumentTree> = [];

  constructor(
    public readonly id: string,
    public readonly name: string,
    totalDocuments: number
  ) {
    for (let i = 0; i < totalDocuments; i++) {
      this.resultDocuments.push(new DocumentTree());
    }
  }

  public getDocumentsArray() {
    return this.resultDocuments.map((d) => d.getDataObject());
  }

  public getDatasetObject(): ReturnDataset<unknown> {
    return {
      id: this.id,
      name: this.name,
      documents: this.getDocumentsArray(),
    };
  }

  public getDocumentObject(index: number): { [key: string]: unknown } {
    if (this.resultDocuments[index])
      return this.resultDocuments[index].getDataObject();
    else
      throw new ChacaDatasetError(
        `The document on index ${index} doesn't exists`
      );
  }

  public setNodeByLocation(
    node: FieldNode,
    location: string[],
    indexDoc: number
  ) {
    this.resultDocuments[indexDoc].setNodeByLocation(node, location);
  }

  public getRefFieldValue(location: string[]): unknown {
    if (location.length === 0) return undefined;
    else {
      let found: unknown[] = [] as unknown[];

      for (let i = 0; i < this.resultDocuments.length; i++) {
        const value = this.resultDocuments[i].getValueByLocation(location);
        if (value !== undefined) found.push(value);
      }

      if (found.length === 0)
        throw new ChacaDatasetError(
          `No se encontro ningun elemento para poder referenciar`
        );
      else return chaca.utils.oneOfArray(found);
    }
  }
}
