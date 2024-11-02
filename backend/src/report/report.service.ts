import { FileService } from './../file/file.service';
import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Report } from '@prisma/client';
import { ReportOutDto, ReportWithFiles } from './dto/report-out.dto';

@Injectable()
export class ReportService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FileService,
  ) {}

  async create(
    data: CreateReportDto,
    files: Express.Multer.File[],
  ): Promise<ReportWithFiles> {
    return this.prisma.report.create({
      data: {
        ...data,
        files: {
          create: files.map((file) => ({
            name: file.originalname,
            diskName: file.filename,
          })),
        },
      },
      include: { files: true },
    });
  }

  async findAll(): Promise<ReportWithFiles[]> {
    return this.prisma.report.findMany({ include: { files: true } });
  }

  async findOne(id: string): Promise<ReportWithFiles | null> {
    return this.prisma.report.findUnique({
      where: { id },
      include: { files: true },
    });
  }

  update(id: string, data: UpdateReportDto): Promise<Report> {
    return this.prisma.report.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.report.delete({ where: { id } });
  }
}
