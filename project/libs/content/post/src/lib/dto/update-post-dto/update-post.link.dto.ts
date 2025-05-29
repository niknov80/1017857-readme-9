import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';
import { PostProperty } from '../../post-module/post.constant';
import { UpdatePostBaseDto } from './update-post.base.dto';

export class UpdateLinkPostDto extends UpdatePostBaseDto {
  @ApiProperty({
    type: String,
    description: PostProperty.Link.Url.Description.Description,
  })
  @IsString()
  @IsUrl()
  @IsOptional()
  public linkUrl: string | null;

  @ApiProperty({
    type: String,
    description: PostProperty.Link.Description.Description.Description,
    maxLength: PostProperty.Link.Description.Validate.MaxLength.Value,
  })
  @IsString()
  @IsOptional()
  @MaxLength(PostProperty.Link.Description.Validate.MaxLength.Value, {
    message: PostProperty.Link.Description.Validate.MaxLength.Message,
  })
  public linkDescription: string | null;
}
