import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import databaseConfig from './config/database.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeederService } from './seeder/seeder.service';
import { User, UserSchema } from './seeder/user.model';

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
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService, SeederService],
})
export class AppModule {}
