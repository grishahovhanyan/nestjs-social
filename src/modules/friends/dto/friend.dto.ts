import { IsNumber, IsOptional, IsString } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { getOrderingDescription } from '@app/swagger'
import { IOrderObject, REQUEST_STATUSES } from '@app/database'
import { FRIENDS_SORT_FIELDS } from '@app/common'

export class GetFriendsDto {
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  page?: number

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  perPage?: number

  @ApiPropertyOptional({ description: getOrderingDescription(FRIENDS_SORT_FIELDS) })
  @IsString()
  @IsOptional()
  ordering?: string

  order?: IOrderObject
  userId: number
  status?: REQUEST_STATUSES
}

export class AddFriendDto {
  @ApiProperty()
  @IsNumber()
  userId: number
}

export class RemoveFriendDto {
  @ApiProperty()
  @IsNumber()
  userId: number
}
