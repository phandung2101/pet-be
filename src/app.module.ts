import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/pet'),
    TransactionModule,
  ],
})
export class AppModule {}
