import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import databaseConfig from './config/database.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeederService } from './seeder/seeder.service';
import { User, UserSchema } from './seeder/models/user.model';
import { Wallet, WalletSchema } from './seeder/models/wallet.model';
import { Coin, CoinSchema } from './seeder/models/coin.model';
import { OfferModule } from './offer/offer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://${configService.get(
          'database.host',
        )}:${configService.get('database.port')}/${configService.get(
          'database.database',
        )}`,
      }),
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Wallet.name, schema: WalletSchema },
      { name: Coin.name, schema: CoinSchema },
    ]),
    OfferModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeederService],
})
export class AppModule {}
