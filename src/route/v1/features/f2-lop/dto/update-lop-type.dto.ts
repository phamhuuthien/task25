import { PartialType } from '@nestjs/mapped-types';
import CreateLopTypeDto from './create-lop-type.dto';

export default class UpdateKhoaTypeDto extends PartialType(
  CreateLopTypeDto,
) {}
