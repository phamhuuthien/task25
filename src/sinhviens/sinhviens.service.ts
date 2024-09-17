import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { KetQua } from "src/shemas/KetQua.schema";
import { Khoa } from "src/shemas/Khoa.schema";
import { Lop } from "src/shemas/Lop.schema";
import { Monhoc } from "src/shemas/MonHoc.schema";
import { Sinhvien } from "src/shemas/Sinhvien.shema";


@Injectable()
export class SinhViensService {
    constructor(
        @InjectModel(Sinhvien.name) private sinhVienModel: Model<Sinhvien>,
        @InjectModel(Monhoc.name) private monHocModel: Model<Monhoc>,
        @InjectModel(KetQua.name) private ketQuaModel: Model<KetQua>,
        @InjectModel(Khoa.name) private khoaModel: Model<Khoa>,
        @InjectModel(Lop.name) private lopModel: Model<Lop>,
    ){}
    getsSinhVien() {
        return this.sinhVienModel.find().select('id hoTen hocBong');
    }

    getsSinhVienNhanHocBong() {
        return this.sinhVienModel.find({ hocBong: { $gt: 0 } });
    }

    getsSinhVienNu() {
        return this.sinhVienModel.find({ gioiTinh: false });
    }

    getsSinhVienHoTran() {
        return this.sinhVienModel.find({ hoTen: { $regex: /^Trần/ } });
    }

    getsSinhVienNhanHocBongLaNu() {
        return this.sinhVienModel.find({
            $and: [
                { hocBong: { $gt: 0 } },
                { gioiTinh: false }
            ]
        });;
    }
    getsSinhVienNhanHocBongHoacLaNu() {
        return this.sinhVienModel.find({
            $or: [
                { hocBong: { $gt: 0 } },
                { gioiTinh: false }
            ]
        });;
    }
    getSinhVienTheoNam(){
        return this.sinhVienModel.find({
            ngaySinh: {
                $gte: new Date(1978, 0, 1),
                $lte: new Date(1985, 11, 31)
            }
        });
    }
    sapXepTangDanTheoMaSinhVien(){
        return this.sinhVienModel.find().sort({ MaSV: 1 });
    }

    sapXepGiamDanTheoHocBong(){
        return this.sinhVienModel.find().sort({ HocBong: -1 })
    }

    // không ra kết quả. Bỏ môn học đi thì ra kết quả
    async danhSachSinhVienCoDiemThiCoSoDuLieuTren8(){
        const monHoc = await this.monHocModel.findOne({tenMH : "CSDL"})

        return this.ketQuaModel.find(
          {$and: [
            { diemThi: { $gte: 8 } },
            { maMonHoc: monHoc._id }
          ]}).populate({path:'maSinhVien',select:'-_id'})
    }


    async danhSachSinhVienKhoaCongNgheCNTTNhanHocBong(){
        const khoa = await this.khoaModel.findOne({tenKhoa : "CNTT"})
        const lops = await this.lopModel.find({maKhoa : khoa._id})
        return this.sinhVienModel.find({
            hocBong: { $gt: 0 },
            maLop: { $in: lops.map(lop => lop._id) }
        })
    }

    async getSinhVienCoHocBongCNTT() {
        const khoaCNTT = await this.khoaModel.findOne({ tenKhoa: "CNTT" });
        const lopsCNTT = await this.lopModel.find({ maKhoa: khoaCNTT._id });
        const sinhVien = await this.sinhVienModel.find({
            hocBong: { $gt: 0 }, 
            maLop: { $in: lopsCNTT.map(lop => lop._id) }, 
        })
        .populate('maLop') 
        .populate({
            path: 'maLop.maKhoa',
            model: 'Khoa',
        });
      
        return sinhVien;
    }

    async countSinhVienTheoLop() {
        const result = await this.sinhVienModel.aggregate([
          {
            $group: {
              _id: "$maLop",
              soLuongSinhVien: { $sum: 1 }
            }
          }
        ]);
      
        return result;
    }

    async countSinhVienTheoKhoa() {
      const result = await this.khoaModel.aggregate([
        {
          $lookup: {
            from: 'lops',
            localField: '_id',
            foreignField: 'maKhoa', 
            as: 'lops',
          },
        },
        {
          $unwind: '$lops',
        },
        {
          $lookup: {
            from: 'sinhviens', 
            localField: 'lops._id',
            foreignField: 'maLop',
            as: 'sinhviens',
          },
        },
        {
          $unwind: '$sinhviens',
        },
        {
          $group: {
            _id: { maKhoa: '$_id', tenKhoa: '$tenKhoa' },
            SLsinhvien: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            MaKhoa: '$_id.maKhoa',
            TenKhoa: '$_id.tenKhoa',
            SLsinhvien: 1,
          },
        },
      ]);
  
      return result;
    }

    async demSinhVienNuMoiKhoa() {
      const result = await this.sinhVienModel.aggregate([
        {
          $match: {
            'nu': false,
          },
        },
        {
          $lookup: {
            from: 'lops',
            localField: 'maLop',
            foreignField: '_id',
            as: 'lops',
          },
        },
        {
          $unwind: '$lops',
        },
        {
          $lookup: {
            from: 'khoas',
            localField: 'lops.maKhoa',
            foreignField: 'maKhoa', 
            as: 'khoas',
          },
        },
        {
          $unwind: '$khoas',
        },
        {
          $group: {
            _id: { maKhoa: '$khoas.maKhoa', tenKhoa: '$khoas.tenKhoa' },
            SLsinhvien: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            MaKhoa: '$_id.maKhoa',
            TenKhoa: '$_id.tenKhoa',
            SLsinhvien: 1,
          },
        },
      ]);
    
      return result;
    }
    

    async tongTienHocBongMoiLop(){
      const result = await this.lopModel.aggregate([
        {
          $lookup:{
            from: 'sinhviens',
            localField: '_id',
            foreignField: 'maLop', 
            as: 'sinhviens',
          }
        },
        {
          $unwind: '$sinhviens',
        },
        {
          $group: {
            _id: { maLop: '$_id', tenLop: '$tenLop' },
            tongHocBong: { $sum: '$sinhviens.hocBong' },
          },
        },
        {
          $project: {
            _id: 0,
            maLop: '$_id.maLop',
            tenLop: '$_id.tenLop',
            tongHocBong: 1,
          },
        },
      ])
      return result;
    }

    async danhSachKhoaNhieuHon100SinhVien() {
      const result = await this.khoaModel.aggregate([
        {
          $lookup: {
            from: 'lops',
            localField: '_id',
            foreignField: 'maKhoa',
            as: 'lops',
          },
        },
        {
          $unwind: '$lops',
        },
        {
          $lookup: {
            from: 'sinhviens',
            localField: 'lops._id',
            foreignField: 'maLop',
            as: 'sinhviens',
          },
        },
        {
          $group: {
            _id: { maKhoa: '$_id', tenKhoa: '$tenKhoa' },
            SLsinhvien: { $sum: { $size: '$sinhviens' } },
          },
        },
        {
          $match: {
            SLsinhvien: { $gt: 100 },
          },
        },
        {
          $project: {
            _id: 0,
            maKhoa: '$_id.maKhoa',
            tenKhoa: '$_id.tenKhoa',
            SLsinhvien: 1,
          },
        },
      ]);
      return result;
    }
    

    async danhSachKhoaNhieuHon50SinhVienNu(){
      const result = await this.khoaModel.aggregate([
        {
          $lookup:{
            from: 'lops',
            localField: '_id',
            foreignField: 'maKhoa', 
            as: 'lops',
          }
        },
        {
          $unwind: '$lops',
        },
        {
          $lookup: {
            from: 'sinhviens',
            localField: 'lops._id',
            foreignField: 'maLop',
            as: 'sinhviens',
          },
        },
        {
          $match : {'sinhviens.nu' : false}
        },
        {
          $group: {
            _id: { maKhoa: '$_id', tenKhoa: '$tenKhoa' },
            SLsinhvien: { $sum: 1 },
          },
        },
        {
          $match: {
            SLsinhvien: { $gt: 50 }, 
          },
        },
        {
          $project: {
            _id: 0,
            maKhoa: '$_id.maKhoa',
            tenKhoa: '$_id.tenKhoa',
            SLsinhvien: 1,
          },
        },
      ])
      return result;
    }


    async danhSachKhoaTienHocBongTren1000000(){
      const result = await this.khoaModel.aggregate([
        {
          $lookup: {
            from: 'lops',
            localField: '_id',
            foreignField: 'maKhoa',
            as: 'lops',
          },
        },
        {
          $unwind: '$lops',
        },
        {
          $lookup: {
            from: 'sinhviens',
            localField: 'lops._id',
            foreignField: 'maLop',
            as: 'sinhviens',
          },
        },
        {
          $unwind: '$sinhviens',
        },
        {
          $group: {
            _id: { maKhoa: '$_id', tenKhoa: '$tenKhoa' },
            TongHB: { $sum: '$sinhviens.hocBong' },
          },
        },
        {
          $match: {
            TongHB: { $gte: 1000000 }, 
          },
        },
        {
          $project: {
            _id: 0,
            maKhoa: '$_id.maKhoa',
            tenKhoa: '$_id.tenKhoa',
            TongHB: 1, 
          },
        },
      ]);
      
      return result;
    }
}
