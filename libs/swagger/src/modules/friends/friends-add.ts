import { applyDecorators } from '@nestjs/common'
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger'

import { SwaggerNotFound404 } from '../../responses'
import { SWAGGER_SCHEMAS } from '../../schemas'

export function SwaggerFriendsAdd() {
  return applyDecorators(
    ApiOkResponse(SWAGGER_SCHEMAS.getFriendResponse),
    ApiBadRequestResponse(SWAGGER_SCHEMAS.addFriendValidationException),
    SwaggerNotFound404()
  )
}
