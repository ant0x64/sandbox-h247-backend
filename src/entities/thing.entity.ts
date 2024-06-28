import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum ThingTypeList {
  ELEMENT = 'element',
  CONTAINER = 'container',
}

@Schema({ virtuals: true, toJSON: { virtuals: true, getters: true } })
export class Thing {
  @Prop({
    type: String,
    virtual: true,
    get: function () {
      return this._id.toString();
    },
  })
  id: string;

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
