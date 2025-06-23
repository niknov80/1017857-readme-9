import { Injectable } from '@nestjs/common';
import { UploadedFile } from '@project/core';
import { BasePostgresRepository } from '@project/data-access';
import { PrismaFileVaultClientService } from '@project/file-vault-models';
import { FileUploaderEntity } from './file-uploader.entity';
import { FileUploaderFactory } from './file-uploader.factory';

@Injectable()
export class FileUploaderRepository extends BasePostgresRepository<
  FileUploaderEntity,
  UploadedFile,
  PrismaFileVaultClientService
> {
  constructor(
    entityFactory: FileUploaderFactory,
    readonly client: PrismaFileVaultClientService,
  ) {
    super(entityFactory, client);
  }

  public async save(entity: FileUploaderEntity): Promise<void> {
    const data = {
      originalName: entity.originalName,
      size: entity.size,
      mimetype: entity.mimetype,
      hashName: entity.hashName,
      path: entity.path,
      subDirectory: entity.subDirectory,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };

    await this.client.file.create({ data });
  }

  public async update(entity: FileUploaderEntity): Promise<void> {
    await this.client.file.update({
      where: { id: entity.id },
      data: {
        originalName: entity.originalName,
        size: entity.size,
        mimetype: entity.mimetype,
        hashName: entity.hashName,
        path: entity.path,
        subDirectory: entity.subDirectory,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      },
    });
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.file.delete({
      where: { id },
    });
  }

  public async findById(id: string): Promise<FileUploaderEntity> {
    const record = await this.client.file.findUniqueOrThrow({
      where: { id },
    });

    return this.createEntityFromDocument(record);
  }
}
