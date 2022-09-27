export class InvalidCreateDataInputError extends Error {
  constructor(fieldMissed: string) {
    super(`The field ${fieldMissed} es necesary to create the datasets`);
  }
}
