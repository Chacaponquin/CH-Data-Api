import { DATA_TYPES } from "../../shared/constants/Types.enum";
import {
  CustomValueNode,
  MixedValueNode,
  RefValueNode,
  SchemaValueNode,
  Node,
} from "../classes/Tree";
import { ChacaDatasetError } from "../errors/ChacaDatasetError";
import { InputDatasetField } from "../interfaces/datasets.interface";

export class TreeUtils {
  public static orderFieldsByPriority(nodes: Array<Node>): Array<Node> {
    const normalNodes: Array<Node> = [];
    const customNodes: Array<CustomValueNode> = [];
    const refNodes: Array<RefValueNode> = [];

    for (const n of nodes) {
      if (n instanceof RefValueNode) {
        refNodes.push(n);
      } else if (n instanceof CustomValueNode) {
        customNodes.push(n);
      } else {
        normalNodes.push(n);
      }
    }

    return [...normalNodes, ...refNodes, ...customNodes];
  }

  public static createNodeByDatatype(field: InputDatasetField): Node {
    const fieldConfig = {
      id: field.id,
      isArray: field.isArray,
      isPosibleNull: field.isPosibleNull,
      name: field.name,
    };

    switch (field.dataType.type) {
      case DATA_TYPES.SINGLE_VALUE: {
        return new SchemaValueNode(
          fieldConfig,
          {
            option: field.dataType.fieldType.type,
            parent: field.dataType.fieldType.parent,
          },
          field.dataType.fieldType.args
        );
      }

      case DATA_TYPES.MIXED: {
        const newNode = new MixedValueNode(fieldConfig);

        newNode.insertSubFields(field.dataType.object);

        return newNode;
      }

      case DATA_TYPES.REF: {
        return new RefValueNode(fieldConfig, field.dataType.ref);
      }

      case DATA_TYPES.CUSTOM: {
        return new CustomValueNode(fieldConfig, field.dataType.code);
      }

      default:
        throw new ChacaDatasetError(
          `The field '${field.name}' has an incorrect dataType`
        );
    }
  }
}
