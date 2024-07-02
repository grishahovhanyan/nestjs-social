import { Module } from '@nestjs/common'

import { FriendRequestsController } from './friend-requests.controller'
import { FriendRequestsService } from './friend-requests.service'
import { FriendsModule } from '@modules/friends/friends.module'

@Module({
  imports: [FriendsModule],
  controllers: [FriendRequestsController],
  providers: [FriendRequestsService],
  exports: [FriendRequestsService]
})
export class FriendRequestsModule {}
