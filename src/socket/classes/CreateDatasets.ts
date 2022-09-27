import { faker } from "@faker-js/faker";
import { Socket } from "socket.io";
import DatasetSchema from "../../db/schemas/DatasetSchema";
import User from "../../db/schemas/User";
import { DataFields } from "../../shared/classes/DataFields";
import { randomChoiceList } from "../../shared/helpers/randomChoice";
import {
  InitialOptionSchema,
  ReturnValue,
} from "../../shared/interfaces/fields.interface";
import { ArgumentSchema } from "../../shared/interfaces/dataArgument.interface";
import { InvalidCreateDataInputError } from "../errors/InvalidCreateDataInputError";
import { InvalidDataTypeError } from "../errors/InvalidDataTypeError";
import { InvalidParentFieldError } from "../errors/InvalidParentFieldError";
import { InvalidTypeError } from "../errors/InvalidTypeError";
import { NotFoundReferenceError } from "../errors/NotFoundReferenceError";
import {
  Dataset,
  DatasetField,
  IFieldTransform,
  ReturnDataset,
} from "../interfaces/datasets.interface";
import { FormatterData } from "../../shared/classes/FormatterData";
import { ARGUMENT_TYPE } from "../../shared/interfaces/fieldsTypes.enum";
import { Types } from "mongoose";
import { CreateCustomValue } from "./CreateCustomValue";
import {
  CustomDataType,
  MixedDataType,
  RefDataType,
  SingleValueDataType,
} from "../interfaces/dataType.interface";
import { RefField } from "./RefField";
import { DATA_TYPES } from "../../shared/helpers/constants/types.enum";
import { ResolveField } from "./ResolveField";
import { CustomField } from "./CustomField";

export class CreateDatasets {
  private datasets: Dataset[] = [];
  private transformDatasets: ReturnDataset<IFieldTransform>[] = [];
  private returnDatasets: ReturnDataset<ReturnValue>[] = [];
  private socket: Socket;
  private documentsToCreate: number = 0;
  private documentsCreated: number = 0;

  constructor(socket: Socket, data: Dataset[]) {
    this.socket = socket;
    if (!data || !data.length) throw new InvalidCreateDataInputError("data");
    else this.datasets = data;
  }

  public async createData(): Promise<ReturnDataset<ReturnValue>[]> {
    let cont = 0;
    for (const dat of this.datasets) cont += dat.limit;
    this.documentsToCreate = cont;
    this.documentsCreated = 0;

    for (let i = 0; i < this.datasets.length; i++) {
      let datasetFields: {
        [path: string]: IFieldTransform | IFieldTransform[];
      }[] = [];
      for (let j = 0; j < this.datasets[i].limit; j++) {
        const fieldData = await this.createDataFields(this.datasets[i].fields);

        const porcent = (this.documentsCreated * 100) / this.documentsToCreate;
        this.socket.emit("documentCreated", { porcent });

        this.documentsCreated += 1;

        datasetFields.push(fieldData);
      }

      this.transformDatasets.push({
        id: this.datasets[i].id,
        name: this.datasets[i].name,
        documents: datasetFields,
      });
    }

    //GENERAR LOS CAMPOS REF
    this.generateRefFields();

    //GENERAR LOS CAMPOS CUSTOM
    await this.generateCustomFields();

    //COPIAR LOS VALORES DE LOS CAMPOS PARA LOS DATASETS QUE SERAN ENVIADOS
    this.returnDatasets = this.transformDatasets.map((dat) => {
      const newDocs = dat.documents.map((doc) => {
        let mod: { [path: string]: ReturnValue | ReturnValue[] } = {};

        for (const key of Object.keys(doc)) {
          const val = doc[key];
          if (Array.isArray(val)) {
            let allValues: ReturnValue[] = [];
            for (let i = 0; i < val.length; i++) {
              allValues.push(val[i].getValue());
            }

            mod = { [key]: allValues };
          } else {
            mod = { [key]: val.getValue() };
          }
        }

        return mod;
      });

      const newDat: ReturnDataset<ReturnValue> = {
        documents: newDocs,
        id: dat.id,
        name: dat.name,
      };

      return newDat;
    });

    return this.returnDatasets;
  }

  private async createDataFields(
    fields: DatasetField[]
  ): Promise<{ [path: string]: IFieldTransform | IFieldTransform[] }> {
    let fieldsData: {
      [path: string]: IFieldTransform | IFieldTransform[];
    } = {};

    for (const field of fields) {
      let saveValue: IFieldTransform | IFieldTransform[];

      if (field.isArray) {
        const max = field.isArray.max < 0 ? 10 : field.isArray.max;
        const min =
          field.isArray.min > max || field.isArray.min < 0
            ? max + 1
            : field.isArray.min;

        const limit = faker.datatype.number({ min, max, precision: 1 });

        saveValue = [] as IFieldTransform[];

        for (let i = 1; i < limit; i++) {
          saveValue.push(await this.generateFieldValue(field));
        }
      } else {
        saveValue = await this.generateFieldValue(field);
      }

      /*if (field.isPosibleNull) {
        const array = new Array(100)
          .fill(0)
          .map((el) => randomChoiceList([null, saveValue]));
        saveValue = randomChoiceList(array);
      }*/

      fieldsData = { ...fieldsData, [field.name]: saveValue };
    }

    return fieldsData;
  }

  private async generateFieldValue(
    field: DatasetField
  ): Promise<IFieldTransform> {
    let value: IFieldTransform;
    const type = field.dataType.type;

    if (type === DATA_TYPES.SINGLE_VALUE)
      value = new ResolveField(
        field.id,
        await this.generateSingleValue(
          field as DatasetField<SingleValueDataType>
        ),
        field
      );
    else if (type === DATA_TYPES.REF)
      value = new RefField(field as DatasetField<RefDataType>, field.id);
    else if (type === DATA_TYPES.CUSTOM)
      value = new CustomField(field.id, field as DatasetField<CustomDataType>);
    else if (type === DATA_TYPES.MIXED)
      value = new ResolveField(
        field.id,
        await this.generateMixedValue(field as DatasetField<MixedDataType>),
        field
      );
    else throw new InvalidDataTypeError(type);

    return value;
  }

  private async generateMixedValue(
    field: DatasetField<MixedDataType>
  ): Promise<{ [key: string]: ReturnValue }> {
    let returnValue = {};

    for (const key of field.dataType.object) {
      let value: ReturnValue;

      if (key.dataType.type === DATA_TYPES.SINGLE_VALUE) {
        value = await this.generateSingleValue(
          key as DatasetField<SingleValueDataType>
        );
      } else
        throw new Error("Un campo de tipo Mixed solo puede ser un SingleValue");

      returnValue = { ...returnValue, [key.name]: value };
    }

    return returnValue;
  }

  private async generateSingleValue(
    field: DatasetField<SingleValueDataType>
  ): Promise<ReturnValue> {
    const fields = await DataFields.getFields();

    const parentFound: InitialOptionSchema | undefined = fields.find((el) => {
      return el.parent === field.dataType.fieldType.parent;
    });

    if (parentFound) {
      const typeFound = parentFound.fields.find((el) => {
        return el.name === field.dataType.fieldType.type;
      });

      if (typeFound) {
        this.validateArguments(
          field.dataType.fieldType.args,
          typeFound.arguments
        );

        return await typeFound.getValue(field.dataType.fieldType.args || {});
      } else throw new InvalidTypeError(field.dataType.fieldType.type);
    } else throw new InvalidParentFieldError(field.dataType.fieldType.parent);
  }

  private validateArguments(args: any, elementArgs: ArgumentSchema[]): void {
    const keys = Object.keys(args) as string[];
    for (let i = 0; i < keys.length; i++) {
      for (const elementArg of elementArgs) {
        if (elementArg.argument === keys[i]) {
          if (elementArg.inputType === ARGUMENT_TYPE.SELECT) {
            if (elementArg.selectValues) {
              const foundValue = elementArg.selectValues.find(
                (el) => el === Object.values(args)[i]
              );

              if (!foundValue) throw new InvalidCreateDataInputError("select");
            }
          }
        }
      }
    }
  }

  private async generateCustomFields(): Promise<void> {
    for (const dat of this.transformDatasets) {
      for (const doc of dat.documents) {
        for (const key of Object.keys(doc)) {
          const val = doc[key];
          if (val instanceof CustomField) {
            val.setValue(
              await new CreateCustomValue(
                val.dataPending as DatasetField<CustomDataType>
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
        for (const key of Object.keys(doc)) {
          const val = doc[key];

          if (Array.isArray(val)) {
            if (val[0] instanceof RefField) {
              for (let i = 0; i < val.length; i++) {
                const v = val[i] as RefField;
                v.setValue(this.generateRefValue(v.getFieldSchema()));
              }
            } else break;
          } else {
            if (val instanceof RefField) {
              val.setValue(this.generateRefValue(val.getFieldSchema()));
            }
          }
        }
      }
    }
  }

  private generateRefValue(
    fieldSchema: DatasetField<RefDataType>
  ): ReturnValue {
    const found = this.transformDatasets.find((el) => {
      el.id === fieldSchema.dataType.ref;
    });

    if (!found) throw new NotFoundReferenceError();
    else {
      let allValuesToRef: ReturnValue[] = [];

      for (const doc of found.documents) {
        for (const key of Object.keys(doc)) {
          const val = doc[key];
          if (typeof val === "object" && Array.isArray(val))
            throw new Error("No se puede referenciar a un campo array");
          else if (val instanceof RefField) {
            if (val.isPending())
              throw new Error("Has caido en un ciclo de referencias");
            else {
              val.setPending(true);

              const value = this.generateRefValue(
                val.dataPending as DatasetField<RefDataType>
              );

              val.setPending(false);
              val.setValue(value);
            }
          } else if (val instanceof ResolveField) {
            allValuesToRef.push(val.getValue());
          }
        }
      }

      return randomChoiceList<ReturnValue>(allValuesToRef);
    }
  }

  public async saveDataSchema(userID: Types.ObjectId): Promise<void> {
    for (const dat of this.datasets) {
      const newSchema = new DatasetSchema({
        name: dat.name,
        data: FormatterData.getObjectSchema(dat.fields),
        author: userID,
      });

      await newSchema.save();

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

  private validateDataInput(): void {}
}
