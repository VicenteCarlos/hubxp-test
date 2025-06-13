import { Module } from '@nestjs/common';
import { BookModule } from './modules/books/books.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
dotenv.config();
const { env } = process;

@Module({
  imports: [MongooseModule.forRoot(env.MONGO_URI as string), BookModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
