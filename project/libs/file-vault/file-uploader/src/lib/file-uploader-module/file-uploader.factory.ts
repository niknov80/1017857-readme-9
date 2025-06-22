import { Injectable } from '@nestjs/common';
import { EntityFactory, UploadedFile } from '@project/core';
import { randomUUID } from 'node:crypto';
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
   * Создание новой сущности из DTO
   */
  public createFromDto(dto: CreateFileDto): FileUploaderEntity {
    return new FileUploaderEntity({
      id: dto.hashName ? `${randomUUID()}_${dto.hashName}` : randomUUID(),
      originalName: dto.originalName,
      size: dto.size,
      mimetype: dto.mimetype,
      hashName: dto.hashName,
      path: dto.path,
      subDirectory: dto.subDirectory,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
    });
  }

  /**
   * Обновление существующей сущности на основе DTO
   */
  public updateFromDto(entity: FileUploaderEntity, dto: UpdateFileDto): FileUploaderEntity {
    const updated = {
      ...entity.toPOJO(),
      ...dto,
      updatedAt: dto.updatedAt ?? new Date(),
    };

    return new FileUploaderEntity(updated);
  }
}
