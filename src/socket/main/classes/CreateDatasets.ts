import { faker } from "@faker-js/faker";
import { Socket } from "socket.io";
import DatasetSchema from "../../../db/schemas/DatasetSchema";
import User from "../../../db/schemas/User";
import { DataFields } from "../../../shared/classes/DataFields";
import { randomChoiceList } from "../../../shared/helpers/randomChoice";
import {
  InitialOptionSchema,
  INPUT_ARGUMENT_TYPE,
  TypeOptionArgument,
} from "../../../shared/interfaces/fields.interface";
import { InvalidCreateDataInputError } from "../errors/InvalidCreateDataInputError";
import { InvalidDataTypeError } from "../errors/InvalidDataTypeError";
import { InvalidParentFieldError } from "../errors/InvalidParentFieldError";
import { InvalidTypeError } from "../errors/InvalidTypeError";
import { NotFoundReferenceError } from "../errors/NotFoundReferenceError";
import {
  Dataset,
  DatasetField,
  DATA_TYPES,
  FieldArgument,
  ReturnDataset,
} from "../interfaces/datasets.interface";
import { FormatterData } from "./FormatterData";

export class CreateDatasets {
  private datasets: Dataset[] = [];
  private returnDatasets: ReturnDataset[] = [];
  private socket: Socket;

  constructor(socket: Socket, data: Dataset[]) {
    this.socket = socket;
    if (!data || !data.length) throw new InvalidCreateDataInputError("data");
    else this.datasets = data;
  }

  public async createData(): Promise<ReturnDataset[]> {
    for (let i = 0; i < this.datasets.length; i++) {
      let datasetFields: any[] = [];
      for (let j = 0; j < this.datasets[i].limit; j++) {
        const fieldData = await this.createDataFields(this.datasets[i].fields);

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
        this.socket.emit("fieldCreated");
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

        if (typeFound.arguments && typeFound.arguments.length > 0) {
          const parameters = this.validateArguments(
            field.args,
            typeFound.arguments
          );

          value = await this.generateValueByConfig(
            field,
            async () => await typeFound.getValue(parameters)
          );
        } else {
          value = await this.generateValueByConfig(
            field,
            async () => await typeFound.getValue({})
          );
        }

        return value;
      } else throw new InvalidTypeError(field.type.type);
    } else throw new InvalidParentFieldError(field.type.parent);
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

  private validateArguments(
    args: FieldArgument[],
    typeArgs: TypeOptionArgument[]
  ) {
    let returnArgs = {};

    for (const typeArg of typeArgs) {
      for (const fielArg of args) {
        if (typeArg.argument === fielArg.field) {
          if (typeArg.inputType === INPUT_ARGUMENT_TYPE.SELECT) {
            if (typeArg.selectValues) {
              const foundValue = typeArg.selectValues?.find(
                (el) => el == fielArg.value
              );

              returnArgs = { ...returnArgs, [typeArg.argument]: foundValue };
            } else
              throw new Error("Debe tener valores a seleccionar. Arreglalo");
          } else {
            returnArgs = { ...returnArgs, [typeArg.argument]: fielArg.value };
          }
        }
      }
    }

    return returnArgs;
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

  public async saveDataSchema(userID: string): Promise<void> {
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
