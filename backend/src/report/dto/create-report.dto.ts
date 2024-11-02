import { ApiProperty } from '@nestjs/swagger';

export class CreateReportDto {
  @ApiProperty({ example: 'Sample report' })
  title: string;
  @ApiProperty({ example: 'This is a sample report' })
  description: string;
  @ApiProperty({ example: 'John Doe' })
  authorName: string;
  @ApiProperty({ example: 30 })
  authorAge: number;
}

export class CreateReportWithFilesDto extends CreateReportDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  files: any[];
}
