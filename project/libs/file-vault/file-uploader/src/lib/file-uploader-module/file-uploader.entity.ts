import { Entity, StorableEntity, UploadedFile } from '@project/core';

export class FileUploaderEntity extends Entity implements StorableEntity<UploadedFile> {
  public originalName: string;
  public size: number;
  public mimetype: string;
  public hashName: string;
  public path: string;
  public createdAt: Date;
  public updatedAt: Date;
  public subDirectory: string;

  constructor(file?: UploadedFile) {
    super();
    this.populate(file);
  }

  public populate(file?: UploadedFile): void {
    if (!file) return;

    // Только если id корректный — сохраняем, иначе Prisma сам сгенерирует
    if (file.id && file.id.trim()) {
      this.id = file.id;
    }

    this.originalName = file.originalName;
    this.size = file.size;
    this.mimetype = file.mimetype;
    this.hashName = file.hashName;
    this.path = file.path;
    this.subDirectory = file.subDirectory;

    // createdAt и updatedAt по возможности берутся из входящих данных
    this.createdAt = file.createdAt ?? new Date();
    this.updatedAt = file.updatedAt ?? new Date();
  }

  public toPOJO(): UploadedFile {
    return {
      id: this.id,
      originalName: this.originalName,
      size: this.size,
      mimetype: this.mimetype,
      hashName: this.hashName,
      path: this.path,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      subDirectory: this.subDirectory,
    };
  }
}
