import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Khoa } from "./schemas/Khoa.schema";
import { Model } from "mongoose";
import KhoaTypeDto from "./dto/create-khoa-type.dto";
import UpdateKhoaTypeDto from "./dto/update-khoa-type.dto";

@Injectable()
export class KhoaTypeService {
    constructor(
        @InjectModel(Khoa.name) private khoaModel: Model<Khoa>,
    ) {}

    create(khoa: KhoaTypeDto) {
        const newKhoa = new this.khoaModel(khoa);
        return newKhoa.save();
    }

    getKhoas(){
        return this.khoaModel.find();
    }

    updateKhoa(id: string, updateKhoaTypeDto: UpdateKhoaTypeDto) {
        return this.khoaModel.findByIdAndUpdate(id, updateKhoaTypeDto, { new: true });
      }
 
    getKhoaById(id: string) {
        return this.khoaModel.findById(id);
    }
}