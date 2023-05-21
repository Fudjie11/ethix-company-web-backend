import { RequestContextStorageService } from './request-context-storage.service';

export class RequestContextService {
  public static get isActive() {
    return RequestContextStorageService.isActive;
  }
  public static get<T = any>(key: string, defaultValue?: any): T {
    return RequestContextStorageService.get(key, defaultValue);
  }

  public static set(key: string, value: any) {
    return RequestContextStorageService.set(key, value);
  }

  public static has(key: string) {
    return RequestContextStorageService.has(key);
  }
}
