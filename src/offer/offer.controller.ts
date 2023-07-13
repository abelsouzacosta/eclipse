import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { OfferService } from './offer.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SetDatePipe } from './pipes/set-date.pipe';

@ApiTags('Offers')
@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Exception' })
  @Post()
  @UsePipes(SetDatePipe, ValidationPipe)
  create(@Body() data: CreateOfferDto) {
    return this.offerService.create(data);
  }

  @ApiResponse({
    status: 200,
    description: 'Return all offers',
  })
  @Get()
  findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('page_size', ParseIntPipe) page_size: number,
  ) {
    return this.offerService.findAll(page, page_size);
  }

  @ApiResponse({
    status: 200,
    description: 'Return a specific offer',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offerService.findOne(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Update offer',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOfferDto: UpdateOfferDto) {
    return this.offerService.update(id, updateOfferDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Delete an offer',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.offerService.remove(id);
  }
}
