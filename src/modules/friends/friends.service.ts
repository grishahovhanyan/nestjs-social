import { Transactional } from 'typeorm-transactional'
import { FindOptionsWhere, UpdateResult } from 'typeorm'
import { Injectable } from '@nestjs/common'

import { Friend, DB_RELATIONS, IFindAndCountInput, REQUEST_STATUSES } from '@app/database'
import { GetFriendsDto } from './dto/friend.dto'
import { FriendsRepository } from './friends.repository'

@Injectable()
export class FriendsService {
  constructor(private readonly friendsRepository: FriendsRepository) {}

  async getAndCount(getFriendsInput: GetFriendsDto) {
    const { userId } = getFriendsInput

    return await this.getAndCountByConditions(getFriendsInput, { userId, status: REQUEST_STATUSES.accepted })
  }

  async getAndCountByConditions(getFriendsInput: GetFriendsDto, conditions: FindOptionsWhere<Friend>) {
    const { page, perPage, order } = getFriendsInput

    const findAndCountInput: IFindAndCountInput<Friend> = {
      conditions,
      relations: [DB_RELATIONS.user, DB_RELATIONS.friend],
      take: perPage,
      skip: (page - 1) * perPage,
      order
    }

    return await this.friendsRepository.findAndCount(findAndCountInput)
  }

  async getByFriendId(friendId: number): Promise<Friend | null> {
    return await this.friendsRepository.findOne({ friendId })
  }

  async getByUserIdAndFriendId(userId: number, friendId: number): Promise<Friend | null> {
    return await this.friendsRepository.findOne({ userId, friendId })
  }

  async create(createDto: Partial<Friend>): Promise<Friend> {
    return await this.friendsRepository.create(createDto)
  }

  async update(id: number, updateDto: Partial<Friend>): Promise<UpdateResult> {
    return await this.friendsRepository.update({ id }, updateDto)
  }

  @Transactional()
  async remove(userId: number, friendId: number): Promise<void> {
    await this.friendsRepository.delete({ userId, friendId })
    await this.friendsRepository.delete({ userId: friendId, friendId: userId })
  }
}
