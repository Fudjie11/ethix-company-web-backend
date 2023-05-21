import { AsyncContextService } from "./async-context.service";

export class RequestContextStorageService {
  public static get(key: string, defaultValue?: any) {
    if (this.isActive()) {
      const result = AsyncContextService.currentContext.get(key);
      if (result === undefined && defaultValue !== undefined) {
        AsyncContextService.currentContext.set(key, defaultValue);
        return defaultValue;
      }
      return result;
    } else if (defaultValue !== undefined) {
      return defaultValue;
    } else {
      return null;
    }
  }

  public static set(key: string, value: any) {
    AsyncContextService.currentContext.set(key, value);

    return value;
  }

  public static has(key: string) {
    return this.isActive() && Boolean(this.get(key));
  }

  public static isActive() {
    return Boolean(AsyncContextService.currentContext);
  }
}
