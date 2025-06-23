import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsMimeType, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateFileDto {
  @ApiProperty({ type: String, description: 'Оригинальное имя файла' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  public originalName: string;

  @ApiProperty({ type: Number, description: 'Размер файла в байтах' })
  @IsInt()
  public size: number;

  @ApiProperty({ type: String, description: 'MIME-тип файла' })
  @IsMimeType()
  public mimetype: string;

  @ApiProperty({ type: String, description: 'Имя файла с хэшем, например: abc123.png' })
  @IsString()
  @MaxLength(255)
  public hashName: string;

  @ApiProperty({ type: String, description: 'Путь к файлу относительно корня хранилища' })
  @IsString()
  @MaxLength(512)
  public path: string;

  @ApiProperty({ type: String, description: 'Подкаталог, например: avatars/' })
  @IsString()
  @MaxLength(255)
  public subDirectory: string;

  @ApiProperty({ type: String, description: 'Дата создания' })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  public createdAt: Date;

  @ApiProperty({ type: String, description: 'Дата обновления' })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  public updatedAt: Date;
}
