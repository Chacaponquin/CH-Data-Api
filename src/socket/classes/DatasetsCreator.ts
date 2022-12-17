import { Socket } from "socket.io";
import DatasetSchema from "../../db/schemas/DatasetSchema";
import User from "../../db/schemas/User";
import { OptionsController } from "../../shared/classes/OptionController";
import {
  InputDataset,
  IFieldTransform,
  ReturnDataset,
  InputDatasetField,
} from "../interfaces/datasets.interface";
import { Types } from "mongoose";
import { CreateCustomValue } from "./CreateCustomValue";
import {
  CustomDataType,
  FieldDataType,
  MixedDataType,
  RefDataType,
  SingleValueDataType,
} from "../interfaces/dataType.interface";
import { RefField } from "./RefField";
import { DATA_TYPES } from "../../shared/constants/Types.enum";
import { ResolveField } from "./ResolveField";
import { CustomField } from "./CustomField";
import { chaca, schemas } from "chaca";
import { ChacaDatasetError } from "../errors/ChacaDatasetError";

export class DatasetsCreator {
  private transformDatasets: ReturnDataset<IFieldTransform>[] = [];
  private returnDatasets: ReturnDataset<any>[] = [];
  private documentsToCreate: number = 0;
  private documentsCreated: number = 0;

  constructor(
    private readonly socket: Socket,
    private readonly inputDatasets: InputDataset[]
  ) {
    if (
      !inputDatasets ||
      !Array.isArray(inputDatasets) ||
      !inputDatasets.length
    )
      throw new ChacaDatasetError(`Your datasets must be an array`);
  }

  public createData(): ReturnDataset<any>[] {
    // iniciar contadores de documentos creados y documentos a crear
    this.documentsToCreate = 0;
    for (const dat of this.inputDatasets) this.documentsToCreate += dat.limit;
    this.documentsCreated = 0;

    for (let i = 0; i < this.inputDatasets.length; i++) {
      let fieldsToResolve: {
        [path: string]: IFieldTransform | IFieldTransform[];
      }[] = [];
      for (let j = 0; j < this.inputDatasets[i].limit; j++) {
        const fieldData = this.createDataFields(this.inputDatasets[i].fields);

        // calcular el porciento de completado y enviarlo al cliente
        const porcent = (this.documentsCreated * 100) / this.documentsToCreate;
        this.socket.emit("documentCreated", { porcent });

        // incrementar el contador de documentos creados
        this.documentsCreated += 1;

        // guardar los fields en el arreglo de fields por resolver
        fieldsToResolve.push(fieldData);
      }

      this.transformDatasets.push({
        id: this.inputDatasets[i].id,
        name: this.inputDatasets[i].name,
        documents: fieldsToResolve,
      });
    }

    // generar campos ref
    this.generateRefFields();

    // generar campos custom
    this.generateCustomFields();

    // copiar los valores a los datasets que seran enviados
    this.copyToReturnDatasets();

    return this.returnDatasets;
  }

  private createDataFields(fields: InputDatasetField[]): {
    [path: string]: IFieldTransform | IFieldTransform[];
  } {
    let fieldsData: {
      [path: string]: IFieldTransform | IFieldTransform[];
    } = {};

    // recorrer todos los fields
    for (const field of fields) {
      let saveValue: IFieldTransform | IFieldTransform[];

      // si es un field array guardarlo en un arreglo
      // en caso contrario guardarlo como un valor independiente
      if (field.isArray) {
        const limit = schemas.dataType.int().getValue({
          min: field.isArray.min,
          max: field.isArray.max,
        });

        saveValue = [] as IFieldTransform[];
        for (let i = 1; i < limit; i++)
          saveValue.push(this.generateFieldValue(field));
      } else {
        saveValue = this.generateFieldValue(field);
      }

      // guardar en el objeto a retornar
      fieldsData = { ...fieldsData, [field.name]: saveValue };
    }

    return fieldsData;
  }

  private generateFieldValue(field: InputDatasetField): IFieldTransform {
    let value: IFieldTransform;
    // obtener type del field
    const type = field.dataType.type;

    // filtrar segun el dataType
    switch (type) {
      case DATA_TYPES.SINGLE_VALUE: {
        value = new ResolveField(
          field.id,
          this.generateSingleValue(
            field as InputDatasetField<SingleValueDataType>
          ),
          field
        );
        break;
      }
      case DATA_TYPES.REF:
        value = new RefField(field as InputDatasetField<RefDataType>, field.id);
        break;
      case DATA_TYPES.CUSTOM:
        value = new CustomField(
          field.id,
          field as InputDatasetField<CustomDataType>
        );
        break;
      case DATA_TYPES.MIXED:
        value = new ResolveField(
          field.id,
          this.generateMixedValue(field as InputDatasetField<MixedDataType>),
          field
        );
        break;
      default:
        throw new ChacaDatasetError(
          `The field ${field.name} has no valid type of value '${type}'`
        );
    }

    return value;
  }

  private generateMixedValue(field: InputDatasetField<MixedDataType>): {
    [key: string]: any;
  } {
    let returnValue = {};

    for (const key of field.dataType.object) {
      let value: any;

      if (key.dataType.type === DATA_TYPES.SINGLE_VALUE) {
        value = this.generateSingleValue(
          key as InputDatasetField<SingleValueDataType>
        );
      } else
        throw new ChacaDatasetError(
          "Un campo de tipo Mixed solo puede ser un SingleValue"
        );

      returnValue = { ...returnValue, [key.name]: value };
    }

    return returnValue;
  }

  private generateSingleValue(
    field: InputDatasetField<SingleValueDataType>
  ): unknown {
    // obtener todas las opciones
    const options = OptionsController.getApiOptions();

    // obtener parent y type del field
    const parent = field.dataType.fieldType.parent;
    const type = field.dataType.fieldType.type;

    // filtrar el tipo
    const parentFound = options.find((el) => el.parent === parent);
    if (parentFound) {
      const typeFound = parentFound.options.find((el) => el.name === type);

      if (typeFound) {
        return typeFound.getValue(field.dataType.fieldType.args);
      } else {
        throw new ChacaDatasetError(
          `${type} do not exists in ${parent} parent`
        );
      }
    } else {
      throw new ChacaDatasetError(`${parent} do not exists`);
    }
  }

  private async generateCustomFields(): Promise<void> {
    for (const dat of this.transformDatasets) {
      for (const doc of dat.documents) {
        for (const [key, value] of Object.entries(doc)) {
          if (value instanceof CustomField) {
            value.setValue(
              await new CreateCustomValue(
                value.dataPending as InputDatasetField<CustomDataType>
              ).generateValue()
            );
          }
        }
      }
    }
  }

  private generateRefFields(): void {
    for (const dat of this.transformDatasets) {
      for (const doc of dat.documents) {
        for (const [key, value] of Object.entries(doc)) {
          if (Array.isArray(value)) {
            if (value[0] instanceof RefField) {
              for (let i = 0; i < value.length; i++) {
                const v = value[i] as RefField;
                v.setValue(this.generateRefValue(v.getFieldSchema()));
              }
            } else break;
          } else {
            if (value instanceof RefField) {
              value.setValue(this.generateRefValue(value.getFieldSchema()));
            }
          }
        }
      }
    }
  }

  private generateRefValue(fieldSchema: InputDatasetField<RefDataType>): any {
    const ref = fieldSchema.dataType.ref;

    const found = this.transformDatasets.find((el) => {
      el.id === ref;
    });

    if (!found) throw new ChacaDatasetError(`Not found ref ${ref}`);
    else {
      let allValuesToRef = [] as any;

      for (const doc of found.documents) {
        for (const v of Object.values(doc)) {
          if (Array.isArray(v)) {
            throw new ChacaDatasetError(
              "You can't reference an field with an array of values."
            );
          } else if (v instanceof RefField) {
            if (v.isPending()) {
              throw new ChacaDatasetError(
                "Has caido en un ciclo de referencias"
              );
            } else {
              v.setPending(true);

              const value = this.generateRefValue(
                v.dataPending as InputDatasetField<RefDataType>
              );

              value.setPending(false);
              value.setValue(value);
            }
          } else if (v instanceof ResolveField) {
            allValuesToRef.push(v.getValue());
          }
        }
      }

      return chaca.utils.oneOfArray(allValuesToRef);
    }
  }

  public async saveDataSchema(userID: Types.ObjectId): Promise<void> {
    // recorrer todos los inputs datasets
    for (const dat of this.inputDatasets) {
      // crear nuevo modelo de schema
      const newSchema = new DatasetSchema({
        name: dat.name,
        data: {},
        author: userID,
      });

      // guardar schema en la BD
      await newSchema.save();

      // guardar id del schema en el usuario
      await User.findOneAndUpdate(
        { _id: userID },
        {
          $push: {
            datasetsSchemas: newSchema._id,
          },
        }
      );
    }
  }

  private generatePosibleNullValue(
    field: IFieldTransform<FieldDataType>
  ): unknown {
    if (field.getFieldSchema().isPosibleNull) {
      const array = new Array(100)
        .fill(0)
        .map((el) => chaca.utils.oneOfArray([null, field.getValue()]));
      return chaca.utils.oneOfArray(array);
    } else return field.getValue();
  }

  private copyToReturnDatasets(): void {
    this.returnDatasets = this.transformDatasets.map((dat) => {
      const newDocs = dat.documents.map((doc) => {
        let mod: { [path: string]: any } = {};

        for (const key of Object.keys(doc)) {
          const val = doc[key];
          if (Array.isArray(val)) {
            let allValues = [];
            for (let i = 0; i < val.length; i++) {
              allValues.push(this.generatePosibleNullValue(val[i]));
            }

            mod = { ...mod, [key]: allValues };
          } else {
            mod = { ...mod, [key]: this.generatePosibleNullValue(val) };
          }
        }

        return mod;
      });

      const newDat: ReturnDataset<any> = {
        documents: newDocs,
        id: dat.id,
        name: dat.name,
      };

      return newDat;
    });
  }
}
