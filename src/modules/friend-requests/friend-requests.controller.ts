import { Controller, Get, Post, Query, Body, Delete, HttpCode } from '@nestjs/common'
import { SWAGGER_TAGS, SwaggerPrivateRoute, SwaggerFriendRequests } from '@app/swagger'

import {
  RequestUser,
  NotFoundException,
  ForbiddenException,
  PAGE_SIZE_TYPES,
  getPageSize,
  paginatedResponse,
  getSortOrderFromQuery,
  FRIEND_REQUESTS_SORT_FIELDS,
  SUCCESS_RESPONSE
} from '@app/common'
import { REQUEST_STATUSES } from '@app/database'
import { GetFriendRequestsDto, AcceptRequestDto, DeclineRequestDto } from './dto/friend-requests.dto'

import { FriendRequestsService } from './friend-requests.service'
import { FriendsService } from '@modules/friends/friends.service'

@SwaggerPrivateRoute(SWAGGER_TAGS.FriendRequests)
@Controller('friend-requests')
export class FriendRequestsController {
  constructor(
    private readonly friendRequestsService: FriendRequestsService,
    private readonly friendsService: FriendsService
  ) {}

  @SwaggerFriendRequests.index()
  @Get()
  async index(@RequestUser('id') currentUserId: number, @Query() query: GetFriendRequestsDto) {
    const page = +query.page || 1
    const perPage = getPageSize(PAGE_SIZE_TYPES.friendRequests, +query.perPage)
    const order = getSortOrderFromQuery(query.ordering?.split(',') ?? [], FRIEND_REQUESTS_SORT_FIELDS)

    const getAndCountInput = {
      page,
      perPage,
      order,
      userId: currentUserId
    }
    const { items, totalCount } = await this.friendRequestsService.getAndCount(getAndCountInput)

    return paginatedResponse(totalCount, page, perPage, items)
  }

  @SwaggerFriendRequests.accept()
  @Post('accept')
  @HttpCode(200)
  async accept(@RequestUser('id') currentUserId: number, @Body() acceptRequestDto: AcceptRequestDto) {
    const friendRequest = await this.friendsService.getByUserIdAndFriendId(acceptRequestDto.userId, currentUserId)

    if (!friendRequest || friendRequest.status !== REQUEST_STATUSES.pending) {
      throw new NotFoundException()
    }

    if (friendRequest.friendId !== currentUserId) {
      throw new ForbiddenException()
    }

    await this.friendRequestsService.accept(friendRequest)

    return SUCCESS_RESPONSE
  }

  @SwaggerFriendRequests.decline()
  @Delete()
  async decline(@RequestUser('id') currentUserId: number, @Body() declineRequestDto: DeclineRequestDto) {
    const friendRequest = await this.friendsService.getByUserIdAndFriendId(declineRequestDto.userId, currentUserId)

    if (!friendRequest || friendRequest.status !== REQUEST_STATUSES.pending) {
      throw new NotFoundException()
    }

    if (friendRequest.friendId !== currentUserId) {
      throw new ForbiddenException()
    }

    await this.friendRequestsService.decline(friendRequest)

    return SUCCESS_RESPONSE
  }
}
