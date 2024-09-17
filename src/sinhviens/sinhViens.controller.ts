import { Controller, Get } from "@nestjs/common";
import { SinhViensService } from "./sinhviens.service";


@Controller("sinhvien")
export class SinhViensController {
    constructor(private sinhviensService: SinhViensService) {}
    @Get("danh-sach-sinh-vien")
    getSinhVien(){
        return this.sinhviensService.getsSinhVien();
    }
    @Get("danh-sach-sinh-vien-hoc-bong")
    getSinhVienNhanHocBong(){
        return this.sinhviensService.getsSinhVienNhanHocBong();
    }

    @Get("danh-sach-sinh-vien-nu")
    getDanhSachSinhVienNu(){
        return this.sinhviensService.getsSinhVienNu();
    }

    @Get("danh-sach-sinh-vien-ho-tran")
    getDanhSachSinhVienHoTran(){
        return this.sinhviensService.getsSinhVienHoTran();
    }

    @Get("danh-sach-sinh-vien-nhan-hoc-bong-la-nu")
    getDanhSachSinhVienNhanHocBongLaNu(){
        return this.sinhviensService.getsSinhVienNhanHocBongLaNu();
    }

    @Get("danh-sach-sinh-vien-nhan-hoc-bong-hoac-nu")
    getDanhSachSinhVienNhanHocBongHoacLaNu(){
        return this.sinhviensService.getsSinhVienNhanHocBongHoacLaNu();
    }

    @Get("danh-sach-sinh-vien-theo-nam")
    getDanhSachSinhVienTheoNam(){
        return this.sinhviensService.getSinhVienTheoNam();
    }


    @Get("sap-xep-tang-dan-theo-msv")
    sapXepTangDanTheoMaSinhVien(){
        return this.sinhviensService.sapXepTangDanTheoMaSinhVien();
    }

    @Get("sap-xep-giam-dan-theo-hoc-bong")
    sapXepTangDanTheoHocBong(){
        return this.sinhviensService.sapXepGiamDanTheoHocBong();
    }
    @Get("danh-sach-sinh-vien-csdl-hon-8")
    danhSachSinhVienCoDiemThiCoSoDuLieuTren8(){
        return this.sinhviensService.danhSachSinhVienCoDiemThiCoSoDuLieuTren8();
    }
    @Get("danh-sach-sinh-vien-cntt-hoc-bong")
    danhSachSinhVienCnttHocBong(){
        return this.sinhviensService.danhSachSinhVienKhoaCongNgheCNTTNhanHocBong();
    }

    @Get("so-sinh-vien-moi-lop")
    soSinhVienMoiLop(){
        return this.sinhviensService.countSinhVienTheoLop();
    }

    @Get("so-sinh-vien-moi-khoa")
    soSinhVienMoiKhoa(){
        return this.sinhviensService.countSinhVienTheoKhoa();
    }

    @Get("tong-tien-hoc-bong-moi-lop")
    tongTienHocBongMoiLop(){
        return this.sinhviensService.tongTienHocBongMoiLop();
    }

    @Get("dem-sinh-vien-nu-moi-khoa")
    demSinhVienNuMoiKhoa(){
        return this.sinhviensService.demSinhVienNuMoiKhoa();
    }

    @Get("danh-sach-khoa-tren-100-sinh-vien")
    danhSachKhoaNhieuHon100SinhVien(){
        return this.sinhviensService.danhSachKhoaNhieuHon100SinhVien();
    }

    @Get("danh-sach-khoa-tren-50-sinh-vien-nu")
    danhSachKhoaNhieuHon50SinhVienNu(){
        return this.sinhviensService.danhSachKhoaNhieuHon50SinhVienNu();
    }

    @Get("danh-sach-khoa-co-tien-hoc-bong-tren1000000")
    danhSachKhoaTienHocBongTren1000000(){
        return this.sinhviensService.danhSachKhoaTienHocBongTren1000000();
    }
}