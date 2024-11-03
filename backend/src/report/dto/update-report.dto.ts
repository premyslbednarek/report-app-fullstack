import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateReportDto } from './create-report.dto';

export class UpdateReportDto extends PartialType(CreateReportDto) {
  @ApiProperty({ required: false })
  fileToDelete?: string; // id of files to delete
}

export class UpdateReportWithFilesDto extends UpdateReportDto {
  @ApiProperty({
    required: false,
    type: 'array',
    items: { type: 'string', format: 'binary' },
  })
  files?: any[];
}
