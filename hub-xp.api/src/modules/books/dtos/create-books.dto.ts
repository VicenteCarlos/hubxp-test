import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsNumber()
  avaliation: number;

  @IsNotEmpty()
  @IsString()
  description: string;
}

export class createReviewCountDto {
  @IsNotEmpty()
  @IsNumber()
  reviewCount: number;
}
