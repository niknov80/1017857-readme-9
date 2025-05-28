import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';
import { PostProperty } from '../../post-module/post.constant';
import { CreatePostBaseDto } from './create-post.base.dto';

export class CreateLinkPostDto extends CreatePostBaseDto {
  @ApiProperty({
    required: true,
    type: String,
    description: PostProperty.Link.Url.Description.Description,
  })
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  public linkUrl: string;

  @ApiProperty({
    required: false,
    type: String,
    description: PostProperty.Link.Description.Description.Description,
    maxLength: PostProperty.Link.Description.Validate.MaxLength.Value,
  })
  @IsString()
  @IsOptional()
  @MaxLength(PostProperty.Link.Description.Validate.MaxLength.Value, {
    message: PostProperty.Link.Description.Validate.MaxLength.Message,
  })
  public linkDescription: string;
}
