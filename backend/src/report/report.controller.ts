import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ReportService } from './report.service';
import {
  CreateReportDto,
  CreateReportWithFilesDto,
} from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Report } from '@prisma/client';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  @ApiBody({ type: CreateReportWithFilesDto })
  @ApiConsumes('multipart/form-data')
  create(
    @Body() createReportDto: CreateReportDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    // since we are using multipart data, everything is a string
    createReportDto.authorAge = Number(createReportDto.authorAge);
    console.log('Dto: ', createReportDto);
    console.log('Files: ', files);
    return this.reportService.create(createReportDto);
  }

  @Get()
  async findAll(): Promise<Report[]> {
    return this.reportService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const report = await this.reportService.findOne(id);
    if (!report) {
      throw new NotFoundException('Report not found');
    }
    return report;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportService.update(id, updateReportDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const report = await this.reportService.findOne(id);
    if (!report) {
      throw new NotFoundException('Report not found');
    }
    return this.reportService.remove(id);
  }
}
