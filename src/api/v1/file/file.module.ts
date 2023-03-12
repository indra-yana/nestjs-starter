import { File } from 'src/core/common/database/typeorm/entities/file';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
  ],
  providers: [FileService],
  controllers: [FileController]
})
export class FileModule {}
