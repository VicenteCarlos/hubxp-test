import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './books.service';
import { BookRepository } from './books.repository';
import { BookTransformer } from './transformer/books.transformer';
import { CreateBookDto } from './dtos/create-books.dto';
import { UpdateBookDto } from './dtos/update-books.dto';
import { createReviewCountDto } from './dtos/create-books.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { AppError } from '../../commons/AppError';
import { OperationErrors } from '../../commons/OperationErrors.enum';

describe('BookService', () => {
  let service: BookService;
  let repository: BookRepository;
  let transformer: BookTransformer;

  const mockBook = {
    _id: '1',
    name: 'Dom Casmurro',
    author: 'Machado de Assis',
    avaliation: 5,
    description: 'Um clássico da literatura brasileira',
    reviewCount: 1,
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockTransformedBook = {
    id: '1',
    name: 'Dom Casmurro',
    author: 'Machado de Assis',
    avaliation: 5,
    description: 'Um clássico da literatura brasileira',
    reviewCount: 1,
  };

  const mockBookRepository = {
    createBook: jest.fn(),
    findAllBooks: jest.fn(),
    findOneBook: jest.fn(),
    updateBook: jest.fn(),
    deleteBook: jest.fn(),
    createReviewCountDto: jest.fn(),
    findBestRatedBooks: jest.fn(),
  };

  const mockBookTransformer = {
    item: jest.fn(),
    collection: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: BookRepository,
          useValue: mockBookRepository,
        },
        {
          provide: BookTransformer,
          useValue: mockBookTransformer,
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    repository = module.get<BookRepository>(BookRepository);
    transformer = module.get<BookTransformer>(BookTransformer);

    // Reset all mocks
    jest.clearAllMocks();
  });

  describe('createBook', () => {
    it('should create a book', async () => {
      const createBookDto: CreateBookDto = {
        name: mockBook.name,
        author: mockBook.author,
        avaliation: mockBook.avaliation,
        description: mockBook.description,
      };

      mockBookRepository.createBook.mockResolvedValue(mockBook);
      mockBookTransformer.item.mockResolvedValue(mockTransformedBook);

      const result = await service.createBook(createBookDto);

      expect(result).toEqual(mockTransformedBook);
      expect(mockBookRepository.createBook).toHaveBeenCalledWith(createBookDto);
      expect(mockBookTransformer.item).toHaveBeenCalledWith(mockBook);
    });
  });

  describe('findAllBooks', () => {
    it('should return paginated books', async () => {
      const queryParams = { page: 1, limit: 10 };
      const mockPaginatedResponse = {
        books: [mockBook],
        total: 1,
      };

      mockBookRepository.findAllBooks.mockResolvedValue(mockPaginatedResponse);
      mockBookTransformer.collection.mockResolvedValue([mockTransformedBook]);

      const result = await service.findAllBooks(queryParams);

      expect(result).toEqual({
        data: [mockTransformedBook],
        meta: {
          total: 1,
          page: 1,
          totalPages: 1,
        },
      });
    });
  });

  describe('findOneBook', () => {
    it('should return a book by id', async () => {
      mockBookRepository.findOneBook.mockResolvedValue(mockBook);
      mockBookTransformer.item.mockResolvedValue(mockTransformedBook);

      const result = await service.findOneBook('1');

      expect(result).toEqual(mockTransformedBook);
      expect(mockBookRepository.findOneBook).toHaveBeenCalledWith('1');
      expect(mockBookTransformer.item).toHaveBeenCalledWith(mockBook);
    });

    it('should throw HttpException if book is not found', async () => {
      mockBookRepository.findOneBook.mockResolvedValue(null);

      await expect(service.findOneBook('1')).rejects.toThrow(
        new HttpException(
          { message: 'Livro não encontrado' },
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });

  describe('updateBook', () => {
    it('should update a book', async () => {
      const updateBookDto: UpdateBookDto = {
        name: 'Dom Casmurro - Edição Atualizada',
      };

      const updatedMockBook = {
        ...mockBook,
        name: updateBookDto.name,
      };

      const updatedTransformedBook = {
        ...mockTransformedBook,
        name: updateBookDto.name,
      };

      mockBookRepository.updateBook.mockResolvedValue(updatedMockBook);
      mockBookTransformer.item.mockResolvedValue(updatedTransformedBook);

      const result = await service.updateBook('1', updateBookDto);

      expect(result).toEqual(updatedTransformedBook);
      expect(mockBookRepository.updateBook).toHaveBeenCalledWith('1', updateBookDto);
      expect(mockBookTransformer.item).toHaveBeenCalledWith(updatedMockBook);
    });

    it('should throw HttpException if book is not found for update', async () => {
      const updateBookDto: UpdateBookDto = {
        name: 'Dom Casmurro - Edição Atualizada',
      };

      mockBookRepository.updateBook.mockResolvedValue(null);

      await expect(service.updateBook('1', updateBookDto)).rejects.toThrow(
        new HttpException(
          { message: 'Livro não encontrado para atualização' },
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });

  describe('deleteBook', () => {
    it('should delete a book', async () => {
      mockBookRepository.deleteBook.mockResolvedValue(mockBook);
      mockBookTransformer.item.mockResolvedValue(mockTransformedBook);

      const result = await service.deleteBook('1');

      expect(result).toEqual(mockTransformedBook);
      expect(mockBookRepository.deleteBook).toHaveBeenCalledWith('1');
      expect(mockBookTransformer.item).toHaveBeenCalledWith(mockBook);
    });

    it('should throw HttpException if book is not found for deletion', async () => {
      mockBookRepository.deleteBook.mockResolvedValue(null);

      await expect(service.deleteBook('1')).rejects.toThrow(
        new HttpException(
          { message: 'Livro não encontrado para exclusão' },
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });

  describe('createReviewCountDto', () => {
    it('should create a review count for a book', async () => {
      const reviewCountDto: createReviewCountDto = {
        reviewCount: 1
      };

      const mockBookWithReview = {
        ...mockBook,
        reviewCount: 2 // reviewCount anterior (1) + 1
      };

      mockBookRepository.findOneBook.mockResolvedValue(mockBook);
      mockBookRepository.createReviewCountDto.mockResolvedValue(mockBookWithReview);
      mockBookTransformer.item.mockResolvedValue({
        ...mockTransformedBook,
        reviewCount: 2
      });

      const result = await service.createReviewCountDto('1', reviewCountDto);

      expect(result).toEqual({
        ...mockTransformedBook,
        reviewCount: 2
      });
      expect(mockBookRepository.findOneBook).toHaveBeenCalledWith('1');
      expect(mockBookRepository.createReviewCountDto).toHaveBeenCalledWith('1', { reviewCount: 2 });
      expect(mockBookTransformer.item).toHaveBeenCalledWith(mockBookWithReview);
    });

    it('should throw HttpException if book is not found for review count update', async () => {
      const reviewCountDto: createReviewCountDto = {
        reviewCount: 1
      };

      mockBookRepository.findOneBook.mockResolvedValue(null);

      try {
        await service.createReviewCountDto('1', reviewCountDto);
        fail('Expected an error to be thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.getResponse()).toEqual({ message: 'Livro não encontrado' });
        expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND);
      }
    });
  });

  describe('findBestRatedBooks', () => {
    it('should return best rated books', async () => {
      const page = 1;
      const limit = 10;
      const mockPaginatedResponse = {
        books: [mockBook],
        total: 1,
      };

      mockBookRepository.findBestRatedBooks.mockResolvedValue(mockPaginatedResponse);
      mockBookTransformer.collection.mockResolvedValue([mockTransformedBook]);

      const result = await service.findBestRatedBooks(page, limit);

      expect(result).toEqual({
        data: [mockTransformedBook],
        meta: {
          total: 1,
          page: 1,
          totalPages: 1,
        },
      });
      expect(mockBookRepository.findBestRatedBooks).toHaveBeenCalledWith(0, 10);
      expect(mockBookTransformer.collection).toHaveBeenCalledWith(mockPaginatedResponse.books);
    });
  });
}); 