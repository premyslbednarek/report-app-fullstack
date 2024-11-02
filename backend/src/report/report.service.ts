import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Report } from '@prisma/client';

@Injectable()
export class ReportService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateReportDto): Promise<Report> {
    return this.prisma.report.create({ data });
  }

  async findAll(): Promise<Report[]> {
    return this.prisma.report.findMany();
  }

  async findOne(id: string): Promise<Report | null> {
    return this.prisma.report.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateReportDto): Promise<Report> {
    return this.prisma.report.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.report.delete({ where: { id } });
  }
}
