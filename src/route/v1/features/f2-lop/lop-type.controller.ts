import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import CreateLopTypeDto from "./dto/create-lop-type.dto";
import { LopTypeService } from "./lop-type.service";


@Controller("lop")
export class LopTypeController {
    constructor(private lopTypeSevice : LopTypeService) {}
    @Post()
    createUser(@Body() body: CreateLopTypeDto): Promise<any> {
        return this.lopTypeSevice.create(body);
    }

    @Get(':id')
    async getLopById(@Param('id') id: string) {
        return this.lopTypeSevice.getLopById(id)
    }

    @Get()
    async getLops() {
        return this.lopTypeSevice.getLops()
    }
}