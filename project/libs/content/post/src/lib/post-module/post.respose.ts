import { ApiResponseOptions } from '@nestjs/swagger';

export const PostResponse: Record<string, ApiResponseOptions> = {
  Created: { status: 201, description: 'Пост успешно создан' },
  Found: { status: 200, description: 'Пост найден' },
  NotFound: { status: 404, description: 'Пост не найден' },
  Deleted: { status: 204, description: 'Пост удалён' },
  Listed: { status: 200, description: 'Список постов' },
  BadRequest: { status: 400, description: 'Некорректные данные запроса' },
};
