import { get, has, set } from 'lodash';

export class EnvironmentService {
  public static get NODE_ENV() {
    // Here we use this kind because webpack always replaces process.env.NODE_ENV with string of the NODE_ENV given on running build project
    return this.get('NODE_ENV', 'local');
  }

  public static set NODE_ENV(newNodeEnv: string) {
    this.set('NODE_ENV', newNodeEnv);
  }

  public static has(envName: string) {
    return has(process.env, envName);
  }

  public static get<T = any>(envName: string, defaultValue?: any) {
    const envValue = get(process.env, envName);
    if (defaultValue !== undefined && (envValue === null || envValue === undefined)) {
      return defaultValue;
    }

    return envValue;
  }

  public static getBoolean(envName: string, defaultValue?: any) {
    const envValue = this.get(envName, defaultValue);

    switch (envValue) {
      case 'true':
      case '1':
        return true;
      case 'false':
      case '0':
      default:
        return false;
    }
  }

  public static set(envName: string, envValue: string | number | boolean) {
    set(process.env, envName, envValue);
  }
}
