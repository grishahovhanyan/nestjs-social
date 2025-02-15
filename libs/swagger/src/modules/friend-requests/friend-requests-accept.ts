import { applyDecorators } from '@nestjs/common'

import { SwaggerSuccess200, SwaggerForbidden403, SwaggerNotFound404 } from '../../responses'

export function SwaggerFriendRequestsAccept() {
  return applyDecorators(SwaggerSuccess200(), SwaggerForbidden403(), SwaggerNotFound404())
}
