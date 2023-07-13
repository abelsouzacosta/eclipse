import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Offer, OfferSchema } from './entities/offer.entity';
import { User, UserSchema } from 'src/seeder/models/user.model';
import { Wallet, WalletSchema } from 'src/seeder/models/wallet.model';
import { Coin, CoinSchema } from 'src/seeder/models/coin.model';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Offer.name, schema: OfferSchema },
      { name: User.name, schema: UserSchema },
      { name: Wallet.name, schema: WalletSchema },
      { name: Coin.name, schema: CoinSchema },
    ]),
  ],
  controllers: [OfferController],
  providers: [OfferService],
})
export class OfferModule {}
