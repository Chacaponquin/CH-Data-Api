import { faker } from "@faker-js/faker";
import { Socket } from "socket.io";
import DatasetSchema from "../../../db/schemas/DatasetSchema";
import User from "../../../db/schemas/User";
import { DataFields } from "../../../shared/classes/DataFields";
import { randomChoiceList } from "../../../shared/helpers/randomChoice";
import { InitialOptionSchema } from "../../../shared/interfaces/fields.interface";
import { ArgumentSchema } from "../../../shared/interfaces/dataArgument.interface";
import { InvalidCreateDataInputError } from "../errors/InvalidCreateDataInputError";
import { InvalidDataTypeError } from "../errors/InvalidDataTypeError";
import { InvalidParentFieldError } from "../errors/InvalidParentFieldError";
import { InvalidTypeError } from "../errors/InvalidTypeError";
import { NotFoundReferenceError } from "../errors/NotFoundReferenceError";
import {
  Dataset,
  DatasetField,
  DATA_TYPES,
  ReturnDataset,
} from "../interfaces/datasets.interface";
import { FormatterData } from "../../../shared/classes/FormatterData";
import { ARGUMENT_TYPE } from "../../../shared/interfaces/fieldsTypes.enum";
import { Types } from "mongoose";

export class CreateDatasets {
  private datasets: Dataset[] = [];
  private returnDatasets: ReturnDataset[] = [];
  private socket: Socket;
  private documentsToCreate: number = 0;
  private documentsCreated: number = 0;

  constructor(socket: Socket, data: Dataset[]) {
    this.socket = socket;
    if (!data || !data.length) throw new InvalidCreateDataInputError("data");
    else {
      this.datasets = data;
    }
  }

  public async createData(): Promise<ReturnDataset[]> {
    let cont = 0;
    for (const dat of this.datasets) cont += dat.limit;
    this.documentsToCreate = cont;
    this.documentsCreated = 0;

    for (let i = 0; i < this.datasets.length; i++) {
      let datasetFields: any[] = [];
      for (let j = 0; j < this.datasets[i].limit; j++) {
        const fieldData = await this.createDataFields(this.datasets[i].fields);

        const porcent = (this.documentsCreated * 100) / this.documentsToCreate;
        this.socket.emit("documentCreated", { porcent });

        this.documentsCreated += 1;

        datasetFields.push(fieldData);
      }

      this.returnDatasets.push({
        name: this.datasets[i].name,
        documents: datasetFields,
      });
    }

    this.generateRefFields();

    return this.returnDatasets;
  }

  private async createDataFields(fields: DatasetField[]): Promise<any[]> {
    let fieldsData: any = {};

    for (const field of fields) {
      let value: any | undefined = undefined;

      switch (field.dataType.type) {
        case DATA_TYPES.SINGLE_VALUE:
          value = await this.generateValue(field);
          break;
        case DATA_TYPES.REF: {
          value = field;
          break;
        }
        default:
          value = undefined;
          break;
      }

      if (value !== undefined) {
        fieldsData = { ...fieldsData, [field.name]: value };
      } else throw new InvalidDataTypeError(field.dataType.type);
    }

    return fieldsData;
  }

  private async generateValue(field: DatasetField): Promise<any> {
    const fields = await new DataFields().getFields();

    const parentFound: InitialOptionSchema | undefined = fields.find(
      (el) => el.parent === field.type.parent
    );
    if (parentFound) {
      const typeFound = parentFound.fields.find(
        (el) => el.name === field.type.type
      );

      if (typeFound) {
        let value;

        this.validateArguments(field.args, typeFound.arguments);

        value = await this.generateValueByConfig(
          field,
          async () => await typeFound.getValue(field.args || {})
        );

        return value;
      } else throw new InvalidTypeError(field.type.type);
    } else throw new InvalidParentFieldError(field.type.parent);
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

  private async generateValueByConfig(
    { isPosibleNull, isArray }: DatasetField,
    callback: any
  ): Promise<any> {
    let returnValue: any = null;

    if (isArray) {
      let newData = [];

      const limit = faker.datatype.number({
        min: isArray.min ? isArray.min : undefined,
        max: isArray.max ? isArray.max : undefined,
      });

      for (let i = 0; i < limit; i++) {
        newData.push(await callback());
      }

      returnValue = newData;
    } else returnValue = await callback();

    if (isPosibleNull) {
      const array = new Array(100)
        .fill(0)
        .map((el) => randomChoiceList([null, returnValue]));
      returnValue = randomChoiceList(array);
    }

    return returnValue;
  }

  private generateRefFields(): void {
    for (const dat of this.returnDatasets) {
      for (let doc of dat.documents) {
        for (let fieldContent of Object.values(doc) as any[]) {
          if (
            fieldContent &&
            fieldContent.dataType &&
            fieldContent.dataType.type &&
            fieldContent.dataType.ref &&
            fieldContent.dataType.fieldRef &&
            fieldContent.dataType.type === DATA_TYPES.REF
          ) {
            const found = this.returnDatasets.find(
              (el) => el.name === fieldContent.dataType.ref
            );

            if (found) {
              const allDataToRef = found.documents.map((el) => {
                for (const key of Object.keys(el)) {
                  if (key === fieldContent.dataType.fieldRef) {
                    if (Array.isArray(el[key]))
                      throw new Error(
                        "No se puede referenciar a un campo array"
                      );
                    return el[key];
                  }
                }
              });

              const valueToRef = randomChoiceList(allDataToRef);

              doc[fieldContent.name] = valueToRef;
            } else throw new NotFoundReferenceError();
          }
        }
      }
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
