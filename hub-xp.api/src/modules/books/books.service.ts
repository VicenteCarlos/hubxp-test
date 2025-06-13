import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto, createReviewCountDto } from './dtos/create-books.dto';
import { BookTransformer } from './transformer/books.transformer';
import { AppError } from '../../commons/AppError';
import { BookRepository } from './books.repository';
import { QueryParamsDTO } from './dtos/query-params.dto';
import { OperationErrors } from 'src/commons/OperationErrors.enum';
import { UpdateBookDto } from './dtos/update-books.dto';

@Injectable()
export class BookService {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly transformer: BookTransformer,
  ) {}

  async createBook(createBookDto: CreateBookDto) {
    const bookCreated = await this.bookRepository.createBook(createBookDto);
    return await this.transformer.item(bookCreated);
  }

  async createReviewCountDto(
    id: string,
    createReviewCountDto: createReviewCountDto,
  ) {
    const bookFound = await this.bookRepository.findOneBook(id);

    if (!bookFound) {
      throw new AppError(
        OperationErrors.NOT_FOUND,
        404,
        'Livro não encontrado',
        true,
      );
    }

    const reviewCountCreated = await this.bookRepository.createReviewCountDto(
      id,
      {
        reviewCount: Number(bookFound.reviewCount) + 1,
      },
    );

    return await this.transformer.item(reviewCountCreated);
  }

  async findOneBook(id: string) {
    const bookFound = await this.bookRepository.findOneBook(id);

    if (!bookFound) {
      throw new AppError(
        OperationErrors.NOT_FOUND,
        404,
        'Livro não encontrado',
        true,
      );
    }

    return await this.transformer.item(bookFound);
  }

  async findAllBooks({ page = 1, limit = 10, ...queryParams }: QueryParamsDTO) {
    const { books, total } = await this.bookRepository.findAllBooks(
      { page, limit, ...queryParams },
      (page - 1) * limit,
      limit,
    );

    const transformedBooks = await this.transformer.collection(books);

    return {
      data: transformedBooks,
      meta: {
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async updateBook(id: string, updateBookDto: UpdateBookDto) {
    const updated = await this.bookRepository.updateBook(id, updateBookDto);

    if (!updated) {
      throw new AppError(
        OperationErrors.NOT_FOUND,
        404,
        'Livro não encontrado para atualização',
        true,
      );
    }

    return await this.transformer.item(updated);
  }

  async deleteBook(id: string) {
    const deleted = await this.bookRepository.deleteBook(id);

    if (!deleted) {
      throw new AppError(
        OperationErrors.NOT_FOUND,
        404,
        'Livro não encontrado para exclusão',
        true,
      );
    }

    return await this.transformer.item(deleted);
  }

  async findBestRatedBooks(page = 1, limit = 10) {
    const { books, total } = await this.bookRepository.findBestRatedBooks(
      (page - 1) * limit,
      limit,
    );

    const transformedBooks = await this.transformer.collection(books);

    return {
      data: transformedBooks,
      meta: {
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getTopBooks(limit: number) {
    const topBooks = await this.bookRepository.getTopBooks(limit);
    const transformedBooks = await this.transformer.collection(topBooks);

    return {
      data: transformedBooks.map((book) => ({
        ...book,
        avgRating: book.avaliation,
      })),
    };
  }
}
