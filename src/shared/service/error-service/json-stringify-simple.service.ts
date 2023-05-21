if (!('toJSON' in Error.prototype)) {
  Object.defineProperty(Error.prototype, 'toJSON', {
    value() {
      const alt = {};

      Object.getOwnPropertyNames(this).forEach(function(key) {
        alt[key] = this[key];
      }, this);

      return alt;
    },
    configurable: true,
    writable: true,
  });
}

export class JsonStringifySimpleService {
  public static replacer = function(depth = Number.MAX_SAFE_INTEGER) {
    // tslint:disable-next-line:one-variable-per-declaration
    let objects, stack, keys;
    const replacerFunc = function(key, value) {
      //  very first iteration
      if (key === '') {
        keys = ['root'];
        objects = [{ keys: 'root', value }];
        stack = [];
        return value;
      }

      //  From the JSON.stringify's doc: "The object in which the key was found is
      //  provided as the replacer's this parameter."
      //  Thus one can control the depth
      while (stack.length && this !== stack[0]) {
        stack.shift();
        keys.pop();
      }

      const type = typeof value;
      if (type === 'boolean' || type === 'number' || type === 'string') {
        return value;
      }
      if (type === 'function') {
        return `[Function, ${value.length + 1} args]`;
      }
      if (value === null) {
        return 'null';
      }
      if (!value) {
        return undefined;
      }
      if (stack.length >= depth) {
        if (Array.isArray(value)) {
          return `[Array(${value.length})]`;
        }
        return '[Object]';
      }
      const found = objects.find(o => o.value === value);
      if (!found) {
        keys.push(key);
        stack.unshift(value);
        objects.push({ keys: keys.join('.'), value });
        return value;
      }
      //  actually, here's the only place where the keys keeping is useful
      return `[Duplicate: ${found.keys}]`;
    };
    return replacerFunc;
  };

  public static stringify(value: any, indent: number = null, maxDepth = Number.MAX_SAFE_INTEGER) {
    return JSON.stringify(value, this.replacer(maxDepth), indent);
  }
}
