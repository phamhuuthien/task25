import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Lop, LopSchema } from 'src/shemas/Lop.schema';
import { LopsService } from './Lops.service';
import { LopController } from './lops.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Lop.name,
        schema: LopSchema,
      }
    ]),
  ],
  providers: [LopsService],
  controllers: [LopController],
})
export class LopsModule {}