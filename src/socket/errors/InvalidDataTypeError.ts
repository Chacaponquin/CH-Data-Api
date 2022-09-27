export class InvalidDataTypeError extends Error {
  constructor(dataType: string) {
    super(`The type ${dataType} does not exist`);
    this.name = "IncorrectDataTypeError";
  }
}
