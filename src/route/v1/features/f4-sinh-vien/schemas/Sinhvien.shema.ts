import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
@Schema({ timestamps: true, versionKey: false, collection: 'sinhviens' })
export class Sinhvien {
  @Prop({required: true })
  hoTen: string;

  @Prop({ required: true })
  nu?: Boolean;

  @Prop({ required: true })
  ngaySinh: Date;

  @Prop({ type: { type: ObjectId, ref: 'Lop' } })
  maLop: ObjectId;

  @Prop({ required: true })
  hocBong: Number;


  @Prop({ required: true })
  tinh: string;
}

export const SinhvienSchema = SchemaFactory.createForClass(Sinhvien);