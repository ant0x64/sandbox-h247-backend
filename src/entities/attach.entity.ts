import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

import { Thing } from './thing.entity';

@Schema()
export class Attach {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: Thing.name,
    required: true,
    unique: true,
  })
  thing: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: Thing.name, required: true })
  container: Types.ObjectId;
}

export const AttachSchema = SchemaFactory.createForClass(Attach);
AttachSchema.index({ thing: 1, container: 1 }, { unique: true });
