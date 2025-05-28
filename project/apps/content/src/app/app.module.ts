import { Module } from '@nestjs/common';
import { PostModule } from '@project/post';

@Module({
  imports: [PostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
