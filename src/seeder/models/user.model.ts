import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class User {
  @Prop({ required: true, unique: false })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, type: Number, unique: true })
  user_id: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
