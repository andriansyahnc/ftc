import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get application information' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns application and repository information',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'fabrotec-test' },
        version: { type: 'string', example: '0.0.1' },
        description: { type: 'string', example: 'NestJS application with TypeScript and Swagger support' },
        framework: { type: 'string', example: 'NestJS' },
        language: { type: 'string', example: 'TypeScript' },
      },
    },
  })
  getInfo() {
    return this.appService.getInfo();
  }
}
