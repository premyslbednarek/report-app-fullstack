import { ApiProperty } from '@nestjs/swagger';
import { CreateReportDto } from './create-report.dto';
import { FileOutDto } from 'src/file/dto/file-out.dto';
import { Prisma } from '@prisma/client';

export type ReportWithFiles = Prisma.ReportGetPayload<{
  include: { files: true };
}>;

export class ReportOutDto extends CreateReportDto {
  public static fromEntity(entity: ReportWithFiles): ReportOutDto {
    return {
      ...entity,
      files: entity.files.map((file) => FileOutDto.fromEntity(file)),
    };
  }

  @ApiProperty()
  id: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty({ type: [FileOutDto] })
  files: FileOutDto[];
}
