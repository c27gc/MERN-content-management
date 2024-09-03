export class InvputValidationError extends Error {
    constructor(message: string = 'Validation error') {
      super(message);
      this.name = 'ValidationError';
      Object.setPrototypeOf(this, InvputValidationError.prototype);
    }
}