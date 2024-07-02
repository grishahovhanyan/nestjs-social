import { Get, Controller, Query } from '@nestjs/common'
import { SWAGGER_TAGS, SwaggerPrivateRoute, SwaggerUsers } from '@app/swagger'

import {
  PAGE_SIZE_TYPES,
  RequestUser,
  USERS_SORT_FIELDS,
  getPageSize,
  getSortOrderFromQuery,
  paginatedResponse
} from '@app/common'
import { GetUsersDto } from './dto/user.dto'
import { UsersService } from './users.service'

@SwaggerPrivateRoute(SWAGGER_TAGS.Users)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @SwaggerUsers.getMe()
  @Get('me')
  async getMe(@RequestUser('id') currentUserId: number) {
    return await this.usersService.getById(currentUserId)
  }

  @SwaggerUsers.index()
  @Get()
  async index(@RequestUser('id') currentUserId: number, @Query() query: GetUsersDto) {
    const page = +query.page || 1
    const perPage = getPageSize(PAGE_SIZE_TYPES.users, +query.perPage)
    const order = getSortOrderFromQuery(query.ordering?.split(',') ?? [], USERS_SORT_FIELDS)

    const getAndCountInput: GetUsersDto = {
      ...query,
      page,
      perPage,
      order,
      userIdsToExclude: [currentUserId]
    }
    const { items, totalCount } = await this.usersService.getAndCount(getAndCountInput)

    return paginatedResponse(totalCount, page, perPage, items)
  }
}
