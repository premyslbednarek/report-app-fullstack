import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ReportModule } from './report/report.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [PrismaModule, ReportModule, FileModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
