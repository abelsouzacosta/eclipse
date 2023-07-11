import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { faker } from '@faker-js/faker';
import { Wallet } from './models/wallet.model';
import { Coin } from './models/coin.model';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel('User')
    private readonly user_model: Model<User>,
    @InjectModel('Wallet')
    private readonly wallet_model: Model<Wallet>,
    @InjectModel('Coin')
    private readonly coin_model: Model<Coin>,
  ) {}

  async seed(): Promise<void> {
    await this.user_model.deleteMany({});
    await this.coin_model.deleteMany({});
    await this.wallet_model.deleteMany({});

    const user: User = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
    };

    const bitcoin: Coin = {
      token_name: 'Bitcoin',
      token_symbol: 'btc',
      amount: 3,
    };

    const ripple: Coin = {
      token_name: 'Ripple',
      token_symbol: 'xrp',
      amount: 300,
    };

    const monero: Coin = {
      token_name: 'Monero',
      token_symbol: 'xmr',
      amount: 12,
    };

    const coins = [bitcoin, ripple, monero];

    await this.user_model.create(user);
    await this.coin_model.create(coins);

    const user_created = await this.user_model.findOne({});
    const ripple_id = await this.coin_model.findOne({
      token_symbol: 'xrp',
    });
    const bitcoin_id = await this.coin_model.findOne({
      token_symbol: 'btc',
    });
    const monero_id = await this.coin_model.findOne({
      token_symbol: 'xmr',
    });

    const coins_id = [ripple_id, bitcoin_id];

    const wallet1: Wallet = {
      user: user_created,
      coins: coins_id,
    };

    const wallet2: Wallet = {
      user: user_created,
      coins: [monero_id],
    };

    const wallets = [wallet1, wallet2];

    await this.wallet_model.create(wallets);
  }
}
