import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

export enum ThingTypeList {
  ELEMENT = 'element',
  CONTAINER = 'container',
}

@Schema()
export class Thing {
  @Prop({ type: SchemaTypes.ObjectId, virtual: true, get: () =>  })
  id: Types.ObjectId;

  @Prop({
    type: Number,
    required: true,
  })
  size: number;

  @Prop({
    type: String,
    enum: ThingTypeList,
    required: true,
  })
  type: ThingTypeList;
}

export const ThingSchema = SchemaFactory.createForClass(Thing);
