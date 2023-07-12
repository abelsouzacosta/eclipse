import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Offer } from './entities/offer.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Coin } from 'src/seeder/models/coin.model';
import { PaginateOfferDto } from './dto/paginate-offer.dto';

@Injectable()
export class OfferService {
  constructor(
    @InjectModel('Offer')
    private readonly offer_model: Model<Offer>,
    @InjectModel('Coin')
    private readonly coin_model: Model<Coin>,
  ) {}

  private async get_coin_amount(id: string): Promise<number> {
    const coin = await this.coin_model.findOne({
      _id: id,
    });

    const amount = coin.amount;

    return amount;
  }

  async create(data: CreateOfferDto): Promise<Offer> {
    const current_balance = await this.get_coin_amount(data.coin);

    if (current_balance < data.units)
      throw new HttpException('Insufficient Balance', HttpStatus.BAD_REQUEST);

    const offer = await this.offer_model.create(data);

    return offer;
  }

  async findAll(page: number, page_size: number): Promise<PaginateOfferDto> {
    const total_items = await this.offer_model.countDocuments({});
    const total_pages = Math.ceil(total_items / page_size);

    const offers = await this.offer_model
      .find()
      .skip((page - 1) * page_size)
      .limit(page_size);

    return {
      current_page: page,
      page_size: page_size,
      total_items,
      total_pages,
      items: offers,
    };
  }

  findOne(id: string) {
    return this.offer_model.findById(id);
  }

  update(id: string, data: UpdateOfferDto) {
    return this.offer_model.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          ...data,
        },
      },
    );
  }

  remove(id: string) {
    return this.offer_model.updateOne({ _id: id }, { $set: { active: false } });
  }
}
