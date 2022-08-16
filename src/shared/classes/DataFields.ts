import {
  AnimalField,
  JobField,
  NameField,
  PhoneField,
  MusicField,
  WordField,
  LoremField,
  ImageField,
  DataTypeField,
  AddressField,
  IDField,
  VideoField,
  FinanceField,
  DateField,
  CodeField,
  SystemField,
  InternetField,
  VehicleField,
} from "../dataSchemas";
import { InitialOptionSchema } from "../interfaces/fields.interface";

export class DataFields {
  public async getFields(): Promise<InitialOptionSchema[]> {
    return [
      { parent: "ID", fields: IDField() },
      { parent: "NAME", fields: NameField() },
      { parent: "JOB", fields: JobField() },
      { parent: "MUSIC", fields: MusicField() },
      { parent: "PHONE", fields: PhoneField() },
      { parent: "ANIMAL", fields: AnimalField() },
      { parent: "WORD", fields: WordField() },
      { parent: "LOREM", fields: LoremField() },
      { parent: "IMAGE", fields: await ImageField() },
      { parent: "DATA_TYPE", fields: DataTypeField() },
      { parent: "ADDRESS", fields: AddressField() },
      { parent: "VIDEO", fields: await VideoField() },
      { parent: "FINNANCE", fields: FinanceField() },
      { parent: "DATE", fields: DateField() },
      { parent: "CODE", fields: CodeField() },
      { parent: "SYSTEM", fields: SystemField() },
      { parent: "INTERNET", fields: InternetField() },
      { parent: "VEHICLE", fields: VehicleField() },
    ];
  }
}
