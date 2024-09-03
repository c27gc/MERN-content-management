export class UserNameTakenError extends Error {
    constructor(message: string = 'Username already taken') {
      super(message);
      this.name = 'UserNameTakenError';
      Object.setPrototypeOf(this, UserNameTakenError.prototype);
    }
  }