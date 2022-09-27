export class InvalidTypeError extends Error {
  constructor(type: string) {
    super(`The type ${type} does not exist`);
    this.name = "IncorrectTypeError";
  }
}
