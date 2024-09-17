import {IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class CreateLopTypeDto {
  @IsNotEmpty()
  @IsString()
  tenLop: string;

  @IsNotEmpty()
  @IsString()
  maKhoa: string;
}
