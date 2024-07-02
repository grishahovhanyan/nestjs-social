import { Transactional } from 'typeorm-transactional'
import { Injectable } from '@nestjs/common'

import { Friend, REQUEST_STATUSES } from '@app/database'
import { GetFriendRequestsDto } from './dto/friend-requests.dto'
import { FriendsService } from '@modules/friends/friends.service'

@Injectable()
export class FriendRequestsService {
  constructor(private readonly friendsService: FriendsService) {}

  async getAndCount(getFriendRequestsInput: GetFriendRequestsDto) {
    const { userId } = getFriendRequestsInput

    return await this.friendsService.getAndCountByConditions(getFriendRequestsInput, {
      friendId: userId,
      status: REQUEST_STATUSES.pending
    })
  }

  @Transactional()
  async accept(friendRequest: Friend): Promise<void> {
    const acceptData = { status: REQUEST_STATUSES.accepted, acceptedAt: new Date() }

    await this.friendsService.update(friendRequest.id, acceptData)
    await this.friendsService.create({
      userId: friendRequest.friendId,
      friendId: friendRequest.userId,
      ...acceptData
    })
  }

  async decline(friendRequest: Friend): Promise<void> {
    await this.friendsService.remove(friendRequest.userId, friendRequest.friendId)
  }
}
