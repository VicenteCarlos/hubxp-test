import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryParamsDTO {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  page?: number = 1;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  avaliation?: number = 1;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  limit?: number = 10;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  author?: string;
} 