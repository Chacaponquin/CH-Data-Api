export class InvalidConfig extends Error {
  constructor() {
    super();
    this.name = "InvalidConfig";
  }
}
