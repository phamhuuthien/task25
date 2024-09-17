import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Sinhvien, SinhvienSchema } from 'src/shemas/Sinhvien.shema';
import { SinhViensService } from './sinhviens.service';
import { SinhViensController } from './sinhViens.controller';
import { Monhoc, MonHocSchema } from 'src/shemas/MonHoc.schema';
import { KetQua, KetQuaSchema } from 'src/shemas/KetQua.schema';
import { Khoa, KhoaSchema } from 'src/shemas/Khoa.schema';
import { Lop, LopSchema } from 'src/shemas/Lop.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Sinhvien.name,
        schema: SinhvienSchema,
      },
      {
        name: Monhoc.name,
        schema: MonHocSchema,
      },
      {
        name: KetQua.name,
        schema: KetQuaSchema,
      },
      {
        name: Khoa.name,
        schema: KhoaSchema,
      },
      {
        name: Lop.name,
        schema: LopSchema,
      }
    ]),
  ],
  providers: [SinhViensService],
  controllers: [SinhViensController],
})
export class SinhViensModule {}