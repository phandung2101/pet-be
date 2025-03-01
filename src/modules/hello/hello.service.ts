import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hello, HelloDocument } from 'src/modules/hello/hello.schema';

@Injectable()
export class HelloService {
  constructor(
    @InjectModel(Hello.name) private helloModel: Model<HelloDocument>,
  ) {}
  
  getHello(): Promise<Hello[]> {
    return this.helloModel.find({}).exec();
  }
}
