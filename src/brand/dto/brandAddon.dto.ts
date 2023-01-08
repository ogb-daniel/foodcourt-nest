import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class BrandAddonDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsInt()
  price: number;

  @IsString()
  category: string;
}
