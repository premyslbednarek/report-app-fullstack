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
import {
  UpdateReportDto,
  UpdateReportWithFilesDto,
} from './dto/update-report.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOkResponse } from '@nestjs/swagger';
import { multerConfig } from 'src/multer.config';
import { ReportOutDto } from './dto/report-out.dto';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files', 100, multerConfig))
  @ApiOkResponse({ type: ReportOutDto })
  @ApiBody({ type: CreateReportWithFilesDto })
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createReportDto: CreateReportDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    // since we are using multipart data, everything is a string
    createReportDto.authorAge = Number(createReportDto.authorAge);

    const report = await this.reportService.create(createReportDto, files);
    return ReportOutDto.fromEntity(report);
  }

  @Get()
  @ApiOkResponse({ type: [ReportOutDto] })
  async findAll() {
    const reports = await this.reportService.findAll();
    return reports.map((report) => ReportOutDto.fromEntity(report));
  }

  @Get(':id')
  @ApiOkResponse({ type: ReportOutDto })
  async findOne(@Param('id') id: string) {
    const report = await this.reportService.findOne(id);
    if (!report) {
      throw new NotFoundException('Report with this id not found');
    }
    return ReportOutDto.fromEntity(report);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('files', 100, multerConfig))
  @ApiOkResponse({ type: ReportOutDto })
  @ApiBody({ type: UpdateReportWithFilesDto })
  @ApiConsumes('multipart/form-data')
  async update(
    @Param('id') id: string,
    @Body() updateReportDto: UpdateReportDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    updateReportDto.authorAge = Number(updateReportDto.authorAge);
    console.log(updateReportDto);
    const report = await this.reportService.update(id, updateReportDto, files);
    return ReportOutDto.fromEntity(report);
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
