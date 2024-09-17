import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Sinhvien, SinhvienSchema } from './shemas/Sinhvien.shema';
import { KetQua, KetQuaSchema } from './shemas/KetQua.schema';
import { Khoa, KhoaSchema } from './shemas/Khoa.schema';
import { Lop, LopSchema } from './shemas/Lop.schema';
import { Monhoc, MonHocSchema } from './shemas/MonHoc.schema';
import { LopsModule } from './lops/lops.module';
import { SinhViensModule } from './sinhviens/sinhViens.module';
import { KhoaTypeModule } from './route/v1/features/f1-khoa/khoa-type.module';
import { LopTypeModule } from './route/v1/features/f2-lop/lop-type.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/task24'),
    LopsModule,
    SinhViensModule,
    KhoaTypeModule,
    LopTypeModule
    // MongooseModule.forFeature([
    //   { name: Sinhvien.name, schema: SinhvienSchema },
    //   { name: KetQua.name, schema: KetQuaSchema },
    //   { name: Khoa.name, schema: KhoaSchema },
    //   { name: Lop.name, schema: LopSchema },
    //   { name: Monhoc.name, schema: MonHocSchema }
    // ])
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
