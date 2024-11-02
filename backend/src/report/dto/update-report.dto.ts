import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateReportDto } from './create-report.dto';

export class UpdateReportDto extends PartialType(CreateReportDto) {
  @ApiProperty({ example: ['id1', 'id2'], default: [] })
  filesToDelete: string; // id of files to delete
}

export class UpdateReportWithFilesDto extends UpdateReportDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  files: any[];
}
