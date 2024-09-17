import {IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class KhoaTypeDto {
  @IsNotEmpty()
  @IsString()
  tenKhoa: string;

  @IsOptional()
  @IsString()
  soCBGD: Number;
}
