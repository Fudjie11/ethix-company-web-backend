export class TagError extends Error {
    constructor(message) {
      super(message);
      this.name = 'TagError';
    }
  }
