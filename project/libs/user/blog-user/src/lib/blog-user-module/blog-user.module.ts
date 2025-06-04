import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@project/models';
import { BlogUserFactory } from './blog-user.factory';
import { BlogUserRepository } from './blog-user.repository';

@Module({
  imports: [PrismaClientModule],
  providers: [BlogUserRepository, BlogUserFactory],
  exports: [BlogUserRepository],
})
export class BlogUserModule {}
