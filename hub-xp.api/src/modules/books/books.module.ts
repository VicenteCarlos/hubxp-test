import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './books.entity';
import { BookTransformer } from './transformer/books.transformer';
import { BookController } from './books.controller';
import { BookRepository } from './books.repository';
import { BookService } from './books.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  controllers: [BookController],
  providers: [BookRepository, BookService, BookTransformer],
})
export class BookModule {}
