export class InvalidFileTypeError extends Error {
  constructor() {
    super();
    this.name = "InvalidFileType";
  }
}
