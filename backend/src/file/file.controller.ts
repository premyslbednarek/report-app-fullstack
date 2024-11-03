import { Controller, Get, Param, StreamableFile } from '@nestjs/common';
import { FileService } from './file.service';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get(':id')
  async getFile(@Param('id') id: string) {
    const fileEntity = await this.fileService.findOne(id);
    const file = createReadStream(join('uploads', fileEntity.diskName));
    return new StreamableFile(file, {
      disposition: `attachment; filename="${fileEntity.name}"`,
      type: fileEntity.mimeType,
    });
  }
}
