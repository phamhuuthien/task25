import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LopTypeService } from "./lop-type.service";
import { Lop } from "./schemas/Lop.schema";
import { Khoa } from "../f1-khoa/schemas/Khoa.schema";
import { LopTypeController } from "./lop-type.controller";

@Module({
    imports: [
      MongooseModule.forFeature([
        {
          name: Lop.name,
          schema: Lop,
        },
        {
            name: Khoa.name,
            schema: Khoa,
          }
      ]),
    ],
    providers: [LopTypeService],
    controllers: [LopTypeController],
  })
  export class LopTypeModule {}