import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
@Schema({ timestamps: true, versionKey: false, collection: 'lops' })
export class Lop {
    @Prop({required: true })
    tenLop: string;
  
    @Prop({ type: { type: ObjectId, ref: 'Khoa' } })
    maKhoa: string;
}

export const LopSchema = SchemaFactory.createForClass(Lop);