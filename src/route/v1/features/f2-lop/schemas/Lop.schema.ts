import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
// import { ObjectId } from 'mongodb';
import mongoose, { Types } from 'mongoose';
@Schema({ timestamps: true, versionKey: false, collection: 'lops' })
export class Lop {
    @Prop({required: true })
    tenLop: string;
  
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Khoa' })
    maKhoa: Types.ObjectId;
}

export const LopSchema = SchemaFactory.createForClass(Lop);