import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOfferDto {
  @IsNumber({})
  @IsNotEmpty({
    message: 'user should be provided',
  })
  @ApiProperty({
    description: 'the user id',
    example: 300,
  })
  user_id: string;

  @IsNumber()
  @IsNotEmpty({
    message: 'coin should be provided',
  })
  @ApiProperty({
    description: 'the coin id',
    example: 233,
  })
  coin_id: number;

  @IsString({
    message: 'wallet should be a string',
  })
  @IsNotEmpty({
    message: 'wallet should be provided',
  })
  @ApiProperty({
    description: 'the wallet id',
    example: '64af611c70574f5bdc740c1c',
  })
  wallet: string;

  @IsNotEmpty({
    message: 'units should be provided',
  })
  @ApiProperty({
    description: 'crypto units to be offered',
    example: 100,
  })
  units: number;

  @IsNotEmpty({
    message: 'price_per_unit should be provided',
  })
  @ApiProperty({
    description: 'unit price of token',
    example: 50000,
  })
  price_per_unit: number;

  date: string;
}
