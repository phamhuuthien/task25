import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
@Schema({ timestamps: true, versionKey: false, collection: 'ketquas' })
export class KetQua {
    @Prop({ type: { type: ObjectId, ref: 'SinhVien' } })
    maSinhVien: string;
  
    @Prop({ type: { type: ObjectId, ref: 'MonHoc' }})
    maMonHoc: string;
    
    @Prop({ required: true })
    diemThi: Number;
}

export const KetQuaSchema = SchemaFactory.createForClass(KetQua);