import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './books.entity';
import { CreateBookDto, createReviewCountDto } from './dtos/create-books.dto';
import { Model } from 'mongoose';
import { QueryParamsDTO } from './dtos/query-params.dto';
import { UpdateBookDto } from './dtos/update-books.dto';

@Injectable()
export class BookRepository {
  constructor(
    @InjectModel(Book.name)
    private readonly bookModel: Model<Book>,
  ) {}

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const book = new this.bookModel({
      ...createBookDto,
      reviewCount: 1,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return await book.save();
  }

  async createReviewCountDto(
    id: string,
    data: { reviewCount: number }
  ) {
    return await this.bookModel
      .findByIdAndUpdate(
        id,
        {
          reviewCount: data.reviewCount,
          updated_at: new Date(),
        },
        { new: true },
      )
      .exec();
  }

  async findOneBook(id: string): Promise<Book | null> {
    return await this.bookModel.findById(id).exec();
  }

  private todasPropsSaoUndefined(obj) {
    return Object.values(obj).every((value) => value === undefined);
  }

  async findAllBooks(
    { page, limit: limitParam, avaliation, ...queryParams }: QueryParamsDTO,
    skip: number,
    limit: number,
  ) {
    if (this.todasPropsSaoUndefined(queryParams)) {
      const [books, total] = await Promise.all([
        this.bookModel.find().skip(skip).limit(limit).exec(),
        this.bookModel.countDocuments().exec(),
      ]);

      return { books, total };
    }

    Object.entries(queryParams).forEach(([_, value]) => {
      if (value === undefined) {
        delete queryParams[_];
      }
    });

    const removeUndefined = this.todasPropsSaoUndefined(queryParams);
    const [books, total] = await Promise.all([
      this.bookModel
        .find(
          removeUndefined
            ? {
                avaliation: { $gte: avaliation },
              }
            : {
                ...queryParams,
                name: { $regex: queryParams.name, $options: 'i' },
                avaliation: { $gte: avaliation },
              },
        )
        .skip(skip)
        .limit(limit)
        .exec(),
      this.bookModel.countDocuments(queryParams).exec(),
    ]);

    return { books, total };
  }

  async updateBook(
    id: string,
    updateBookDto: UpdateBookDto,
  ): Promise<Book | null> {
    return await this.bookModel
      .findByIdAndUpdate(
        id,
        {
          ...updateBookDto,
          created_at: new Date(),
          updated_at: new Date(),
        },
        { new: true },
      )
      .exec();
  }

  async deleteBook(id: string): Promise<Book | null> {
    return await this.bookModel.findByIdAndDelete(id).exec();
  }

  async findBestRatedBooks(skip: number, limit: number) {
    const [books, total] = await Promise.all([
      this.bookModel
        .find({ avaliation: { $gte: 3.5 } })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.bookModel.countDocuments({ avaliation: { $gte: 3.5 } }).exec(),
    ]);

    return { books, total };
  }

  async getTopBooks(limit: number) {
    const books = await this.bookModel
      .find()
      .sort({ avaliation: -1, reviewCount: -1 })
      .limit(limit)
      .exec();

    return books;
  }
}
