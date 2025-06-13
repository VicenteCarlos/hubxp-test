import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BookService } from './books.service';
import { CreateBookDto, createReviewCountDto } from './dtos/create-books.dto';
import { QueryParamsDTO } from './dtos/query-params.dto';
import { UpdateBookDto } from './dtos/update-books.dto';

@Controller('/books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async createBook(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createBookDto: CreateBookDto,
  ) {
    const data = await this.bookService.createBook(createBookDto);
    res.status(HttpStatus.CREATED).json({ data });
  }

  @Post('/reviewCount/:id')
  async createReviewCount(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createReviewCountDto: createReviewCountDto,
    @Param('id') id: string,
  ) {
    const data = await this.bookService.createReviewCountDto(
      id,
      createReviewCountDto,
    );
    res.status(HttpStatus.CREATED).json({ data });
  }

  @Get('top')
  async getTopBooks(
    @Req() req: Request,
    @Res() res: Response,
    @Query('limit') limit = 10,
  ) {
    const data = await this.bookService.getTopBooks(+limit);
    res.status(HttpStatus.OK).json(data);
  }

  @Get('reviews')
  async findBestRatedBooks(
    @Req() req: Request,
    @Res() res: Response,
    @Query() { page = 1, limit = 10 }: QueryParamsDTO,
  ) {
    const data = await this.bookService.findBestRatedBooks(page, limit);
    res.status(HttpStatus.OK).json(data);
  }

  @Get()
  async findAllBooks(
    @Req() req: Request,
    @Res() res: Response,
    @Query() queryParams: QueryParamsDTO,
  ) {
    const data = await this.bookService.findAllBooks(queryParams);
    res.status(HttpStatus.OK).json(data);
  }

  @Get(':id')
  async findOneBook(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    const data = await this.bookService.findOneBook(id);
    res.status(HttpStatus.OK).json({ data });
  }

  @Put(':id')
  async updateBook(
    @Req() req: Request,
    @Res() res: Response,
    @Body() updateBookDto: UpdateBookDto,
    @Param('id') id: string,
  ) {
    const data = await this.bookService.updateBook(id, updateBookDto);
    res.status(HttpStatus.OK).json({ data });
  }

  @Delete(':id')
  async deleteBook(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    await this.bookService.deleteBook(id);
    res.status(HttpStatus.OK).json({ message: 'Livro deletado com sucesso' });
  }
}
