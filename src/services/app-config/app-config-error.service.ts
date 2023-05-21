export class AppConfigError extends Error {
    constructor(message) {
      super(message);
      this.name = 'AppConfigError';
    }
  }
