import { applyDecorators } from '@nestjs/common'

import { SwaggerSuccess200, SwaggerNotFound404 } from '../../responses'

export function SwaggerFriendsRemove() {
  return applyDecorators(SwaggerSuccess200(), SwaggerNotFound404())
}
