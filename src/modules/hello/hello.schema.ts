
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HelloDocument = HydratedDocument<Hello>;

@Schema({
  collection: 'hello'
})
export class Hello {
  @Prop()
  message: string;
}

export const HelloSchema = SchemaFactory.createForClass(Hello);
