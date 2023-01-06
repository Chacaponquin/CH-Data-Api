import { schemas } from "chaca";
import { Socket } from "socket.io";
import { ChacaDatasetError } from "../errors/ChacaDatasetError";
import {
  InputDataset,
  InputFieldIsArray,
  ReturnDataset,
} from "../interfaces/datasets.interface";
import {
  ChacaResultDatasetTree,
  MixedFieldNode,
  ResultFieldNode,
} from "./ResultTree";
import {
  Node,
  RefValueNode,
  SchemaValueNode,
  ChacaDatasetTree,
  MixedValueNode,
  CustomValueNode,
} from "./Tree";

export class DatasetsController {
  private resultDatasets: Array<ChacaResultDatasetTree> = [];
  private datasetsTrees: Array<ChacaDatasetTree> = [];

  private documentsToCreate: number = 0;
  private documentsCreated: number = 0;

  constructor(private readonly socket: Socket, inputDatasets: InputDataset[]) {
    if (!Array.isArray(inputDatasets))
      throw new ChacaDatasetError(`Your datasets must be an array`);

    for (const inputDat of inputDatasets) {
      // crear el arbol del dataset
      const newDatTree = new ChacaDatasetTree(
        inputDat.id,
        inputDat.name,
        inputDat.limit
      );

      // insertar todos los fields del dataset dentro del arbol
      newDatTree.insertDatasetsFields(inputDat.fields);

      // crear y añadir el arbol de solucion del dataset
      this.resultDatasets.push(
        new ChacaResultDatasetTree(inputDat.id, inputDat.name, inputDat.limit)
      );

      this.datasetsTrees.push(newDatTree);
    }
  }

  public createData(): Array<ReturnDataset<unknown>> {
    // inicializar la cantidad de documentos creados y la cantidad de documentos por crear en 0
    this.documentsToCreate = 0;
    this.datasetsTrees.forEach((d) => (this.documentsCreated += d.limit));
    this.documentsCreated = 0;

    // recorrer todos los datasets
    for (const dat of this.datasetsTrees) {
      // segun el limite del dataset crear cada documento
      for (let indexDoc = 0; indexDoc < dat.limit; indexDoc++) {
        // recorrer los fields del dataset actual para crear cada uno en el documento que le pertenece
        for (const datField of dat.fields) {
          // darle valor al field e insertarlo en al respectivo documento
          this.resolveFieldNode(
            this.resultDatasets.find((d) => d.id === dat.id)!,
            datField,
            [],
            indexDoc
          );

          // calcular el porciento de completado
          const porcent =
            (this.documentsCreated * 100) / this.documentsToCreate;

          // enviar porciento al cliente
          this.socket.emit("documentCreated", { porcent });

          // incrementar el contador de documentos creados
          this.documentsCreated += 1;
        }
      }
    }

    return this.resultDatasets.map((d) => d.getDatasetObject());
  }

  private getValueByConfig(getValue: () => unknown, field: Node) {
    if (field.isArray) {
      const limit = schemas.dataType
        .int()
        .getValue({ min: field.isArray.min, max: field.isArray.max });

      for (let i = 0; i < limit; i++) {}
    } else {
      return;
    }
  }

  private resolveFieldNode(
    datasetSolution: ChacaResultDatasetTree,
    field: Node,
    location: string[],
    indexDoc: number
  ) {
    // caso de ser un schema field
    if (field instanceof SchemaValueNode) {
      const value = field.getValue();

      const solNode = new ResultFieldNode(field.id, field.name, value);

      datasetSolution.setNodeByLocation(solNode, location, indexDoc);
    }

    // caso de ser un mixed field
    else if (field instanceof MixedValueNode) {
      const solNode = new MixedFieldNode(field.id, field.name);

      datasetSolution.setNodeByLocation(solNode, location, indexDoc);

      for (const n of field.nodes) {
        this.resolveFieldNode(
          datasetSolution,
          n,
          [...location, field.id],
          indexDoc
        );
      }
    }

    // caso de ser un ref field
    else if (field instanceof RefValueNode) {
      const findDatasetRef = this.resultDatasets.find(
        (d) => d.id === field.ref[0]
      );

      if (findDatasetRef) {
        const value = findDatasetRef.getRefFieldValue(field.ref.slice(1));

        const solNode = new ResultFieldNode(field.id, field.name, value);

        datasetSolution.setNodeByLocation(solNode, location, indexDoc);
      } else {
        throw new ChacaDatasetError(
          `Error while reference field ${field.name}`
        );
      }
    }

    // caso de ser un custom field
    else if (field instanceof CustomValueNode) {
      const value = field.getValue(datasetSolution.getDocumentObject(indexDoc));

      const solNode = new ResultFieldNode(field.id, field.name, value);

      datasetSolution.setNodeByLocation(solNode, location, indexDoc);
    }
  }
}
