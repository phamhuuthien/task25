import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { Khoa } from "./schemas/Khoa.schema";
import { KhoaTypeService } from "./khoa-type.service";
import KhoaTypeDto from "./dto/create-khoa-type.dto";
import UpdateKhoaTypeDto from "./dto/update-khoa-type.dto";

@Controller("khoa")
export class KhoaTypeController {
    constructor(private khoaTypeSevice : KhoaTypeService) {}

    @Get()
    getKhoas(){
        return this.khoaTypeSevice.getKhoas()
    }
    @Get(':id')
    async getKhoaById(@Param('id') id: string) {
        return this.khoaTypeSevice.getKhoaById(id)
    }
    @Post()
    createUser(@Body() body: KhoaTypeDto): Promise<any> {
        return this.khoaTypeSevice.create(body);
    }
    @Patch(':id')
    async updateUser(
        @Param('id') id: string,
        @Body() updateKhoaTypeDto: UpdateKhoaTypeDto,
    ) {
        const updatedUser = await this.khoaTypeSevice.updateKhoa(id, updateKhoaTypeDto);
        return updatedUser;
    }
}