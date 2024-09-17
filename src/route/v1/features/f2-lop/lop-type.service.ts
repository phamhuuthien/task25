import { Injectable, NotFoundException } from "@nestjs/common";
import CreateLopTypeDto from "./dto/create-lop-type.dto";
import { Lop } from "./schemas/Lop.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Khoa } from "../f1-khoa/schemas/Khoa.schema";

@Injectable()
export class LopTypeService {
    constructor(
        @InjectModel(Lop.name) private lopModel: Model<Lop>,
        @InjectModel(Khoa.name) private khoaModel: Model<Khoa>,
    ) {}
    async create({maKhoa,...body} :CreateLopTypeDto){
        const khoa = await this.khoaModel.findById(maKhoa)
        if(!khoa){
            throw new NotFoundException(`Không tìm thấy khoa với mã ${maKhoa}`);
        }
        const newLop = this.lopModel.create({maKhoa:khoa._id,...body});
        return newLop;
    }

    getLopById(id:string){
        return this.lopModel.findById(id);
    }

    getLops(){
        return this.lopModel.find().populate('maKhoa');
    }
}