import { Controller, Get } from "@nestjs/common";
import { LopsService } from "./Lops.service";

@Controller("lop")
export class LopController {
    constructor(private lopsService: LopsService) {}
    @Get()
    getUsers() {
        return this.lopsService.getsLop();
    }
}