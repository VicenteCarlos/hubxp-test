import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema({ timestamps: true })
export class Book extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true, min: 1, max: 5 })
  avaliation: number;

  @Prop({ required: true })
  description: string;

  @Prop({ default: 0 })
  reviewCount: number;

  @Prop()
  coverUrl: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book); 