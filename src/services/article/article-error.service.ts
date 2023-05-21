export class ArticleError extends Error {
    constructor(message) {
      super(message);
      this.name = 'ArticleError';
    }
  }
