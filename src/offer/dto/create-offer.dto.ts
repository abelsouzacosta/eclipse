import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOfferDto {
  @IsString({
    message: 'user should be a string',
  })
  @IsNotEmpty({
    message: 'user should be provided',
  })
  user: string;

  @IsString({
    message: 'coin should be a string',
  })
  @IsNotEmpty({
    message: 'coin should be provided',
  })
  coin: string;

  @IsString({
    message: 'wallet should be a string',
  })
  @IsNotEmpty({
    message: 'wallet should be provided',
  })
  wallet: string;

  @IsNotEmpty({
    message: 'units should be provided',
  })
  units: number;

  @IsNotEmpty({
    message: 'price_per_unit should be provided',
  })
  price_per_unit: number;

  date: string;
}
