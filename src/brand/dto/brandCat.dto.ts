import { IsNotEmpty, IsString } from 'class-validator';

export class BrandCatDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
