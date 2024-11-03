import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReportWithFiles } from './dto/report-out.dto';

@Injectable()
export class ReportService {
  constructor(private readonly prisma: PrismaService) {}

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
            mimeType: file.mimetype,
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

  async update(
    id: string,
    data: UpdateReportDto,
    files: Express.Multer.File[],
  ): Promise<ReportWithFiles> {
    const { fileToDelete, ...reportData } = data;

    return this.prisma.$transaction(async (prisma) => {
      if (fileToDelete) {
        await prisma.file.delete({ where: { id: fileToDelete } });
      }

      return prisma.report.update({
        where: { id },
        data: {
          ...reportData,
          files: {
            create: files.map((file) => ({
              name: file.originalname,
              diskName: file.filename,
              mimeType: file.mimetype,
            })),
          },
        },
        include: { files: true },
      });
    });
  }

  async remove(id: string) {
    const deleteFiles = this.prisma.file.deleteMany({
      where: { reportId: id },
    });
    const deleteReport = this.prisma.report.delete({ where: { id } });
    await this.prisma.$transaction([deleteFiles, deleteReport]);
  }
}
