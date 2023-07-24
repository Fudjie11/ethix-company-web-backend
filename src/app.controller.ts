import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiExcludeEndpoint } from '@nestjs/swagger';
import { ConfigService } from 'src/shared/service/config/config.service';
import { EnvironmentService } from './shared/service/config/environment.service';

@Controller('/')
export class AppController {
  @Get()
  hello() {
    return `Hello! ETHIX Backend ${EnvironmentService.NODE_ENV} is up !`;
  }

  @Get('ping')
  ping() {
    return 'OK!';
  }

  @Get('version')
  version() {
    const pkg = require('../package.json');
    return `${pkg.name} v${pkg.version}`;
  }
}
