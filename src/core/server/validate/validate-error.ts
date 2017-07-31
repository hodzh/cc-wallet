export class ValidateError extends Error {
  constructor(public messages) {
    super('Validation error');
  }
}
