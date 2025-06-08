import { ApiResponseOptions } from '@nestjs/swagger';
import { BasePostRdo } from '../rdo/base-post.rdo';

export const PostResponse: Record<string, ApiResponseOptions> = {
  Created: { status: 201, description: 'Пост успешно создан', type: BasePostRdo },
  Found: { status: 200, description: 'Пост найден', type: BasePostRdo },
  NotFound: { status: 404, description: 'Пост не найден' },
  Deleted: { status: 204, description: 'Пост удалён' },
  Listed: { status: 200, description: 'Список постов', type: BasePostRdo, isArray: true },
  BadRequest: { status: 400, description: 'Некорректные данные запроса' },
  Updated: { status: 200, description: 'Пост успешно обновлен', type: BasePostRdo },
};
