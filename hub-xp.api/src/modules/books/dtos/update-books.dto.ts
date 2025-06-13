import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsNumber()
  avaliation?: number;

  @IsOptional()
  @IsString()
  description?: string;
} 