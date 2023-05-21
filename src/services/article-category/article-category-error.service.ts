export class ArticleCategoryError extends Error {
    constructor(message) {
      super(message);
      this.name = 'ArticleCategoryError';
    }
  }
