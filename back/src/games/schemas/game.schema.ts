import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type GameDocument = Game & Document;

@Schema({
  toJSON: {
    virtuals: true,
    transform: (doc: any, ret: any) => {
      delete ret._id;
    },
  },
  versionKey: false,
})
export class Game {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  })
  _id: any;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  title: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  synopsis: string;

  @Prop({
    type: Number,
    required: true,
    trim: true,
  })
  note: number;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  image: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  test: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  platform: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);
