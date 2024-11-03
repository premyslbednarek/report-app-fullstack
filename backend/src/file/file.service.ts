import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { File } from '@prisma/client';

@Injectable()
export class FileService {
  constructor(private readonly prisma: PrismaService) {}

  create(file: Express.Multer.File, reportId: string): Promise<File> {
    return this.prisma.file.create({
      data: {
        name: file.originalname,
        diskName: file.filename,
        mimeType: file.mimetype,
        reportId,
      },
    });
  }

  findOne(id: string): Promise<File | null> {
    return this.prisma.file.findUnique({ where: { id } });
  }

  remove(id: string): Promise<File> {
    return this.prisma.file.delete({ where: { id } });
  }
}
