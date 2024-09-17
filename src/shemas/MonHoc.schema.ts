import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';


@Schema({ timestamps: true, versionKey: false, collection: 'monhocs' })
export class Monhoc {
    @Prop({required: true })
    tenMonHoc: string;
  
    @Prop({ required: true })
    soTiet: Number;
}

export const MonHocSchema = SchemaFactory.createForClass(Monhoc);