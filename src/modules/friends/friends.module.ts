import { Module } from '@nestjs/common'

import { FriendsController } from './friends.controller'
import { FriendsService } from './friends.service'
import { FriendsRepository } from './friends.repository'
import { UsersModule } from '@modules/users/users.module'

@Module({
  imports: [UsersModule],
  controllers: [FriendsController],
  providers: [FriendsService, FriendsRepository],
  exports: [FriendsService, FriendsRepository]
})
export class FriendsModule {}
