import { ConfigService } from './shared/service/config/config.service';
import path from 'path';

ConfigService.registerDirectory(path.resolve(
  path.join(__dirname, 'asset/config'),
));
