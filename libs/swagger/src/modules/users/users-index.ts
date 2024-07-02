import { applyDecorators } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'

import { SWAGGER_SCHEMAS } from '../../schemas'
import { userProperties } from '../../schema-properties'

export function SwaggerUsersIndex() {
  return applyDecorators(ApiOkResponse(SWAGGER_SCHEMAS.paginatedResponse(userProperties)))
}
