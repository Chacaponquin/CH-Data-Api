export class InvalidParentFieldError extends Error {
  constructor(parent: string) {
    super(`The parent ${parent} does not exist`);
    this.name = "InvalidParentFieldError";
  }
}
