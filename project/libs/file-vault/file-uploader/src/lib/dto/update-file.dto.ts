import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsInt, IsMimeType, IsOptional, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateFileDto {
  @ApiPropertyOptional({ type: String, description: 'Оригинальное имя файла' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  public originalName?: string;

  @ApiPropertyOptional({ type: Number, description: 'Размер файла в байтах' })
  @IsOptional()
  @IsInt()
  public size?: number;

  @ApiPropertyOptional({ type: String, description: 'MIME-тип файла' })
  @IsOptional()
  @IsMimeType()
  public mimetype?: string;

  @ApiPropertyOptional({ type: String, description: 'Имя файла с хэшем' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  public hashName?: string;

  @ApiPropertyOptional({ type: String, description: 'Путь к файлу' })
  @IsOptional()
  @IsString()
  @MaxLength(512)
  public path?: string;

  @ApiPropertyOptional({ type: String, description: 'Подкаталог' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  public subDirectory?: string;

  @ApiPropertyOptional({ type: String, description: 'Дата создания' })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  public createdAt?: Date;

  @ApiPropertyOptional({ type: String, description: 'Дата обновления' })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  public updatedAt?: Date;
}
