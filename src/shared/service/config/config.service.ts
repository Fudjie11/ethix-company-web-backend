import { castArray, extend, get, has, identity, set, snakeCase } from 'lodash';
import { EnvironmentService } from './environment.service';

export class ConfigService {
  public static get config() { return require('config'); }
  public static overridenConfigs = {};

  public static setConfigurationEnvName(configEnvName: string = EnvironmentService.NODE_ENV) {
    EnvironmentService.set('NODE_CONFIG_ENV', configEnvName);
  }

  public static registerDirectory(directories: string | string[]) {
    directories = castArray(directories);

    const envName = 'NODE_CONFIG_DIR';
    const existingDir = EnvironmentService.get(envName);
    const existingDirectories = (existingDir || '').split(':');
    const finalDirectories = existingDirectories.concat(directories).filter(identity);
    const finalDir = finalDirectories.join(':');

    EnvironmentService.set(envName, finalDir);

    console.log(`=== NODE-CONFIG CONFIGURATION VALUE (${finalDir}) ===`, JSON.stringify(Object.assign({}, ConfigService.config, this.overridenConfigs), null, 2));
  }

  public static getSafe(key: string, defaultValue?: any) {
    if (this.has(key)) {
      return this.config.get(key);
    }
    return defaultValue;
  }

  public static get(key: string, defaultValue?: any) {
    const envProbName = snakeCase(key).toUpperCase();
    if (EnvironmentService.has(envProbName)) {
      return EnvironmentService.get(envProbName);
    } else if (has(this.overridenConfigs, key)) {
      return get(this.overridenConfigs, key, defaultValue);
    } else {
      if (arguments.length > 1) {
        if (this.has(key)) {
          return this.config.get(key);
        }
        return defaultValue;
      }
      return this.config.get(key);
    }
  }

  public static has(key: string) {
    return has(this.overridenConfigs, key) || this.config.has(key);
  }

  public static set(key: string, value: any) {
    return set(this.overridenConfigs, key, value);
  }

  public static bindCustomConfiguration(config: any = {}) {
    extend(this.overridenConfigs, config);
  }
}

// set default config environment to follow NODE_ENV
ConfigService.setConfigurationEnvName();
