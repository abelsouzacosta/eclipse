import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Offer } from './entities/offer.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Coin } from 'src/seeder/models/coin.model';
import { PaginateOfferDto } from './dto/paginate-offer.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { isToday, parse } from 'date-fns';
import { Wallet } from 'src/seeder/models/wallet.model';

@Injectable()
export class OfferService {
  private readonly logger: Logger = new Logger(OfferService.name);

  constructor(
    @InjectModel('Offer')
    private readonly offer_model: Model<Offer>,
    @InjectModel('Coin')
    private readonly coin_model: Model<Coin>,
    @InjectModel('Wallet')
    private readonly wallet_model: Model<Wallet>,
  ) {}

  async check_valid_coin(coin_id: number): Promise<void> {
    const result = await this.coin_model.findOne({
      coin_id,
    });

    if (!result) {
      this.logger.error(`Token not found ${coin_id}`);
      throw new HttpException(
        `Token ${coin_id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async check_valid_wallet(id: string): Promise<void> {
    const result = await this.wallet_model.findById(id);

    if (!result)
      throw new HttpException(
        `Invalid wallet ${id} provided`,
        HttpStatus.BAD_REQUEST,
      );
  }

  async match_wallet_coin(wallet_id: string, coin_id: number): Promise<void> {
    const wallet = await this.wallet_model.findById(wallet_id);
    const coins_ids = [];

    for (const coin of wallet.coins) {
      coins_ids.push(coin.coin_id);
    }

    if (!coins_ids.includes(coin_id))
      throw new HttpException('Invalid coin to wallet', HttpStatus.BAD_REQUEST);
  }

  async get_amount(coin_id: number): Promise<number> {
    const result = await this.coin_model.findOne({ coin_id });

    return result.amount;
  }

  async set_new_amount(coin_id: number, new_amount: number): Promise<void> {
    await this.coin_model.updateOne(
      {
        coin_id,
      },
      {
        $set: { amount: new_amount },
      },
    );
  }

  async create(data: CreateOfferDto): Promise<void> {
    await this.check_valid_coin(data.coin_id);
    await this.check_valid_wallet(data.wallet);
    await this.match_wallet_coin(data.wallet, data.coin_id);
    const original_amount = await this.get_amount(data.coin_id);

    if (original_amount <= 0)
      throw new HttpException(
        'Impossible to create offer, insufficent funds',
        HttpStatus.BAD_REQUEST,
      );

    this.logger.log(`Create new offer`);
    await this.offer_model.create(data);
    const new_amount = original_amount - data.units;
    await this.set_new_amount(data.coin_id, new_amount);
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

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async deactivate_offers(): Promise<void> {
    this.logger.log(`Initializing Offer Deactivation Cron`);

    const offers = await this.offer_model.find({
      active: true,
    });
    const invalid_offers_ids = [];

    for (const offer of offers) {
      const offer_date = parse(offer.date, 'dd/MM/yyyy', new Date());

      if (!isToday(offer_date)) {
        invalid_offers_ids.push(offer._id);
      }
    }

    if (invalid_offers_ids.length > 0) {
      this.logger.log(`Deactivating invalid offers`);
      await this.offer_model.updateMany(
        {
          _id: { $in: invalid_offers_ids },
        },
        {
          active: false,
        },
      );
    } else {
      this.logger.log(`Any invalid offers was found`);
    }

    this.logger.log(`Stopping Offer Deactivation Cron`);
  }
}
