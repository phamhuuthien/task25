import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Lop } from "src/shemas/Lop.schema";

@Injectable()
export class LopsService {
    constructor(@InjectModel(Lop.name) private lopModel: Model<Lop>,){}
    getsLop() {
        return this.lopModel.find();
    }
}