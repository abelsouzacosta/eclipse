import { IsNumber, IsOptional } from 'class-validator';

export class UpdateOfferDto {
  @IsNumber()
  @IsOptional()
  units: number;

  @IsNumber()
  @IsOptional()
  price_per_unit: number;
}
