import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'

import { Friend, BaseRepository } from '@app/database'

@Injectable()
export class FriendsRepository extends BaseRepository<Friend> {
  constructor(dataSource: DataSource) {
    super(dataSource, Friend)
  }
}
