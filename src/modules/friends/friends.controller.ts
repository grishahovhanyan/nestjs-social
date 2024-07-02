import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common'
import { SWAGGER_TAGS, SwaggerPrivateRoute, SwaggerFriends } from '@app/swagger'

import {
  RequestUser,
  PAGE_SIZE_TYPES,
  getPageSize,
  paginatedResponse,
  FRIEND_REQUESTS_SORT_FIELDS,
  getSortOrderFromQuery,
  ERROR_MESSAGES,
  NotFoundException,
  BadRequestException,
  SUCCESS_RESPONSE
} from '@app/common'
import { REQUEST_STATUSES } from '@app/database'
import { GetFriendsDto, AddFriendDto, RemoveFriendDto } from './dto/friend.dto'

import { FriendsService } from './friends.service'
import { UsersService } from '@modules/users/users.service'

@SwaggerPrivateRoute(SWAGGER_TAGS.Friends)
@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService, private readonly usersService: UsersService) {}

  @SwaggerFriends.index()
  @Get()
  async index(@RequestUser('id') currentUserId: number, @Query() query: GetFriendsDto) {
    const page = +query.page || 1
    const perPage = getPageSize(PAGE_SIZE_TYPES.friends, +query.perPage)
    const order = getSortOrderFromQuery(query.ordering?.split(',') ?? [], FRIEND_REQUESTS_SORT_FIELDS)

    const getAndCountInput = {
      page,
      perPage,
      order,
      userId: currentUserId
    }

    const { items, totalCount } = await this.friendsService.getAndCount(getAndCountInput)

    return paginatedResponse(totalCount, page, perPage, items)
  }

  @SwaggerFriends.addFriend()
  @Post()
  async addFriend(@RequestUser('id') currentUserId: number, @Body() addFriendDto: AddFriendDto) {
    const user = await this.usersService.getById(addFriendDto.userId)

    if (!user || currentUserId === addFriendDto.userId) {
      throw new NotFoundException()
    }

    const friendRequest = await this.friendsService.getByUserIdAndFriendId(currentUserId, addFriendDto.userId)
    if (friendRequest && friendRequest.status === REQUEST_STATUSES.pending) {
      throw new BadRequestException(ERROR_MESSAGES.requestHasAlreadyBeenSent)
    }

    if (friendRequest && friendRequest.status === REQUEST_STATUSES.accepted) {
      throw new BadRequestException(ERROR_MESSAGES.alreadyFriends)
    }

    const reverseRequest = await this.friendsService.getByUserIdAndFriendId(addFriendDto.userId, currentUserId)
    let acceptData: { status?: REQUEST_STATUSES; acceptedAt?: Date } = {}
    if (reverseRequest) {
      // User[addFriendDto.userId] already sended request to User[currentUserId]
      // make them friends to each other
      acceptData = { status: REQUEST_STATUSES.accepted, acceptedAt: new Date() }
      await this.friendsService.update(reverseRequest.id, acceptData)
    }

    // userId - ID of the user who sent the request
    // friendId - ID of the user to whom the request was sent (can accept or decline using APIs [POST][DELETE] /friend-requests/)
    const friend = await this.friendsService.create({
      userId: currentUserId,
      friendId: addFriendDto.userId,
      ...acceptData
    })

    return friend
  }

  @SwaggerFriends.removeFriend()
  @Delete()
  async removeFriend(@RequestUser('id') currentUserId: number, @Body() removeFriendDto: RemoveFriendDto) {
    const friend = await this.friendsService.getByFriendId(removeFriendDto.userId)

    if (!friend || friend.status === REQUEST_STATUSES.pending) {
      throw new NotFoundException()
    }

    await this.friendsService.remove(currentUserId, removeFriendDto.userId)

    return SUCCESS_RESPONSE
  }
}
