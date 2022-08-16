export class CreateFieldObjectError extends Error {
  constructor(fieldError: string) {
    super(`Error creating the field ${fieldError}`);
    this.name = "CreateFieldObjectError";
  }
}
