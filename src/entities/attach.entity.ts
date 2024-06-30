import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

import { Thing } from './thing.entity';

@Schema({
  toObject: { getters: false },
  toJSON: { getters: false, versionKey: false },
})
export class Attach {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: Thing.name,
    required: true,
    unique: true,
  })
  thing: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: Thing.name,
    required: true,
  })
  container: string;
}

export const AttachSchema = SchemaFactory.createForClass(Attach);
AttachSchema.index({ thing: 1, container: 1 }, { unique: true });
