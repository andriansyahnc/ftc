import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() {
    return {
      name: 'fabrotec-test',
      version: '0.0.1',
      description: 'NestJS application with TypeScript and Swagger support',
      framework: 'NestJS',
      language: 'TypeScript',
    };
  }
}
