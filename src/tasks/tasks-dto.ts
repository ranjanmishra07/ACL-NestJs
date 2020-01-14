import {IsNotEmpty} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  readonly taskType: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly taskNumber: number;

  @ApiProperty()
  readonly description: string;
}
