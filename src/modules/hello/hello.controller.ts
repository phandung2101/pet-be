import { Controller, Get } from '@nestjs/common';
import { HelloService } from './hello.service';
import { Hello } from 'src/modules/hello/hello.schema';

@Controller()
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @Get()
  getHello(): Promise<Hello[]> {
    return this.helloService.getHello();
  }
}
