import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Coin } from 'src/seeder/models/coin.model';
import { User } from 'src/seeder/models/user.model';
import { Wallet } from 'src/seeder/models/wallet.model';

@Schema({
  collection: 'offers',
  timestamps: true,
})
export class Offer {
  @Prop({ required: true, type: Number, unique: false })
  user_id: number;

  @Prop({ required: true, type: Number, unique: false })
  coin_id: number;

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'Wallet' })
  wallet: Wallet;

  @Prop({ required: true, type: Number })
  units: number;

  @Prop({ required: true, type: Number })
  price_per_unit: number;

  @Prop({ required: true, type: String })
  date: string;

  @Prop({ required: true, default: true, type: Boolean })
  active: boolean;
}

export const OfferSchema = SchemaFactory.createForClass(Offer);
