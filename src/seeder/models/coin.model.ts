import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  collection: 'coins',
})
export class Coin {
  @Prop({ required: true, type: String })
  token_name: string;

  @Prop({ required: true, type: String })
  token_symbol: string;

  @Prop({ required: true, type: Number, unique: false })
  coin_id: number;

  @Prop({ required: true, type: Number })
  amount: number;
}

export const CoinSchema = SchemaFactory.createForClass(Coin);
