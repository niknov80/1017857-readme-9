import { Injectable } from '@nestjs/common';
import { EntityFactory, UploadedFile } from '@project/core';
import { CreateFileDto } from '../dto/create-file.dto';
import { UpdateFileDto } from '../dto/update-file.dto';
import { FileUploaderEntity } from './file-uploader.entity';

@Injectable()
export class FileUploaderFactory implements EntityFactory<FileUploaderEntity> {
  /**
   * Восстановление сущности из POJO (например, из БД)
   */
  public create(entityPlainData: UploadedFile): FileUploaderEntity {
    return new FileUploaderEntity(entityPlainData);
  }

  /**
   * Создание новой сущности из DTO (при создании нового файла)
   */
  public createFromDto(dto: CreateFileDto): FileUploaderEntity {
    return new FileUploaderEntity({
      originalName: dto.originalName,
      size: dto.size,
      mimetype: dto.mimetype,
      hashName: dto.hashName,
      path: dto.path,
      subDirectory: dto.subDirectory,
      createdAt: dto.createdAt ?? new Date(),
      updatedAt: dto.updatedAt ?? new Date(),
    });
  }

  /**
   * Обновление существующей сущности
   */
  public updateFromDto(entity: FileUploaderEntity, dto: UpdateFileDto): FileUploaderEntity {
    return new FileUploaderEntity({
      ...entity.toPOJO(),
      ...dto,
      updatedAt: new Date(),
    });
  }
}
