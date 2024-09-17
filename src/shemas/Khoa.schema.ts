import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'khoas' })
export class Khoa {
    @Prop({required: true })
    tenKhoa: string;
  
    @Prop({ required: true })
    soCBGD: Number;
}

export const KhoaSchema = SchemaFactory.createForClass(Khoa);