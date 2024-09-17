import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Khoa } from "./schemas/Khoa.schema";
import { KhoaTypeService } from "./khoa-type.service";
import { KhoaTypeController } from "./khoa-type.controller";

@Module({
    imports: [
      MongooseModule.forFeature([
        {
          name: Khoa.name,
          schema: Khoa,
        }
      ]),
    ],
    providers: [KhoaTypeService],
    controllers: [KhoaTypeController],
  })
  export class KhoaTypeModule {}