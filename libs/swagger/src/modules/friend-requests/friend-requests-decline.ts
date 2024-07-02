import { applyDecorators } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'

import { SwaggerForbidden403, SwaggerNotFound404 } from '../../responses'

export function SwaggerFriendRequestsDecline() {
  return applyDecorators(ApiOkResponse(), SwaggerForbidden403(), SwaggerNotFound404())
}
