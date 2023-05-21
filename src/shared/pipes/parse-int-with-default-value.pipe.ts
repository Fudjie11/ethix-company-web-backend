export class ParseIntPipeWithDefaultValue {
  private defaultValue
  constructor(defaultValue: number) {
      this.defaultValue = defaultValue;    
  }
  async transform(value, metadata) {
      const isNumeric = ['string', 'number'].includes(typeof value) &&
          !isNaN(parseFloat(value)) &&
          isFinite(value);
      if (!isNumeric || !value) {
          return this.defaultValue;
      }
      return parseInt(value, 10);
  }
};