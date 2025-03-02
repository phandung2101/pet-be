import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({
  collection: 'transaction',
})
export class Transaction {
  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  type: 'EXPENSE' | 'INCOME';

  @Prop()
  category: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
