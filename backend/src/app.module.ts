import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ReportModule } from './report/report.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [PrismaModule, ReportModule, FileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
