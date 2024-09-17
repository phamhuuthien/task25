import { PartialType } from '@nestjs/mapped-types';
import KhoaTypeDto from './create-khoa-type.dto';

export default class UpdateKhoaTypeDto extends PartialType(
  KhoaTypeDto,
) {}
