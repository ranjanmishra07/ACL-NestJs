import { Injectable } from '@nestjs/common';

export class AppService {
  async getHello(): Promise<string> {
    return 'Hello World!';
  }
}
