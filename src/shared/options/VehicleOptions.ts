import { schemas } from "chaca";
import { OptionSchema } from "../interfaces/fields.interface";

export const VehicleOptions: OptionSchema[] = [
  {
    exampleValue: schemas.vehicle.bicycle().getValue(),
    getValue: () => schemas.vehicle.bicycle().getValue,
    name: "Bicycle",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.vehicle.manufacturer().getValue(),
    getValue: schemas.vehicle.manufacturer().getValue,
    name: "Manufacturer",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.vehicle.vehicleModel().getValue(),
    getValue: schemas.vehicle.vehicleModel().getValue,
    name: "Model",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.vehicle.vehicleType().getValue(),
    getValue: schemas.vehicle.vehicleType().getValue,
    name: "Type",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.vehicle.vehicle().getValue(),
    getValue: schemas.vehicle.vehicle().getValue,
    name: "Vehicle",
    arguments: [],
    description: { en: "", es: "" },
  },
  {
    exampleValue: schemas.vehicle.fuel().getValue(),
    getValue: () => schemas.vehicle.fuel().getValue,
    name: "Fuel Type",
    arguments: [],
    description: { en: "", es: "" },
  },
];
