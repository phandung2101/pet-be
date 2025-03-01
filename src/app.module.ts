import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HelloModule } from './modules/hello/hello.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/pet'),
    HelloModule,
  ],
})
export class AppModule {}
