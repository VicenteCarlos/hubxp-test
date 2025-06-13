import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { BookController } from './books.controller';
import { BookService } from './books.service';
import { CreateBookDto } from './dtos/create-books.dto';
import { UpdateBookDto } from './dtos/update-books.dto';
import { createReviewCountDto } from './dtos/create-books.dto';

describe('BookController (e2e)', () => {
  let app: INestApplication;
  let bookService: BookService;

  const mockBook = {
    id: '1',
    name: 'Dom Casmurro',
    author: 'Machado de Assis',
    avaliation: 5,
    description: 'Um clássico da literatura brasileira',
    reviewCount: 1
  };

  const mockBookService = {
    createBook: jest.fn(),
    findAllBooks: jest.fn(),
    findOneBook: jest.fn(),
    updateBook: jest.fn(),
    deleteBook: jest.fn(),
    createReviewCountDto: jest.fn(),
    findBestRatedBooks: jest.fn(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: mockBookService,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    bookService = moduleFixture.get<BookService>(BookService);
    await app.init();
  });

  afterEach(async () => {
    await app.close();
    jest.clearAllMocks();
  });

  describe('POST /books', () => {
    it('should create a book', async () => {
      const createBookDto: CreateBookDto = {
        name: mockBook.name,
        author: mockBook.author,
        avaliation: mockBook.avaliation,
        description: mockBook.description,
      };

      mockBookService.createBook.mockResolvedValue(mockBook);

      const response = await request(app.getHttpServer())
        .post('/books')
        .send(createBookDto)
        .expect(201);

      expect(response.body.data).toEqual(mockBook);
      expect(mockBookService.createBook).toHaveBeenCalledWith(createBookDto);
    });
  });

  describe('GET /books', () => {
    it('should return paginated books', async () => {
      const mockResponse = {
        data: [mockBook],
        meta: {
          total: 1,
          page: 1,
          totalPages: 1,
        },
      };

      mockBookService.findAllBooks.mockResolvedValue(mockResponse);

      const response = await request(app.getHttpServer())
        .get('/books')
        .query({ page: 1, limit: 10 })
        .expect(200);

      expect(response.body).toEqual(mockResponse);
      expect(mockBookService.findAllBooks).toHaveBeenCalled();
    });
  });

  describe('GET /books/:id', () => {
    it('should return a book by id', async () => {
      mockBookService.findOneBook.mockResolvedValue(mockBook);

      const response = await request(app.getHttpServer())
        .get(`/books/${mockBook.id}`)
        .expect(200);

      expect(response.body.data).toEqual(mockBook);
      expect(mockBookService.findOneBook).toHaveBeenCalledWith(mockBook.id);
    });
  });

  describe('PUT /books/:id', () => {
    it('should update a book', async () => {
      const updateBookDto: UpdateBookDto = {
        name: 'Dom Casmurro - Edição Atualizada',
      };

      mockBookService.updateBook.mockResolvedValue({
        ...mockBook,
        ...updateBookDto,
      });

      const response = await request(app.getHttpServer())
        .put(`/books/${mockBook.id}`)
        .send(updateBookDto)
        .expect(200);

      expect(response.body.data).toEqual({
        ...mockBook,
        ...updateBookDto,
      });
      expect(mockBookService.updateBook).toHaveBeenCalledWith(
        mockBook.id,
        updateBookDto,
      );
    });
  });

  describe('DELETE /books/:id', () => {
    it('should delete a book', async () => {
      mockBookService.deleteBook.mockResolvedValue(mockBook);

      await request(app.getHttpServer())
        .delete(`/books/${mockBook.id}`)
        .expect(200);

      expect(mockBookService.deleteBook).toHaveBeenCalledWith(mockBook.id);
    });
  });

  describe('POST /books/reviewCount/:id', () => {
    it('should create a review count for a book', async () => {
      const reviewCountDto: createReviewCountDto = {
        reviewCount: 1
      };

      const updatedBook = {
        ...mockBook,
        reviewCount: 1
      };

      mockBookService.createReviewCountDto.mockResolvedValue(updatedBook);

      const response = await request(app.getHttpServer())
        .post(`/books/reviewCount/${mockBook.id}`)
        .send(reviewCountDto)
        .expect(201);

      expect(response.body.data).toEqual(updatedBook);
      expect(mockBookService.createReviewCountDto).toHaveBeenCalledWith(
        mockBook.id,
        reviewCountDto
      );
    });
  });

  describe('GET /books/reviews', () => {
    it('should return best rated books', async () => {
      const mockResponse = {
        data: [mockBook],
        meta: {
          total: 1,
          page: 1,
          totalPages: 1,
        },
      };

      mockBookService.findBestRatedBooks.mockResolvedValue(mockResponse);

      const response = await request(app.getHttpServer())
        .get('/books/reviews')
        .query({ page: 1, limit: 10 })
        .expect(200);

      expect(response.body).toEqual(mockResponse);
      expect(mockBookService.findBestRatedBooks).toHaveBeenCalledWith('1', '10');
    });
  });
}); 