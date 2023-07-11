import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './user.model';
import { Coin } from './coin.model';

@Schema({
  collection: 'wallets',
  timestamps: true,
})
export class Wallet {
  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ required: false, type: mongoose.Types.ObjectId, ref: 'Coin' })
  coins: Coin[];
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
