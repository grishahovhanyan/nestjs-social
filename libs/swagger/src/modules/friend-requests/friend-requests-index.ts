import { applyDecorators } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'

import { SWAGGER_SCHEMAS } from '../../schemas'
import { friendProperties } from '../../schema-properties'

export function SwaggerFriendRequestsIndex() {
  return applyDecorators(ApiOkResponse(SWAGGER_SCHEMAS.paginatedResponse(friendProperties)))
}
