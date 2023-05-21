export class WarehouseError extends Error {
    constructor(message) {
      super(message);
      this.name = 'WarehouseError';
    }
  }
