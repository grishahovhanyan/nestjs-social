import { IsNumber, IsOptional, IsString } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { getOrderingDescription } from '@app/swagger'
import { FRIEND_REQUESTS_SORT_FIELDS } from '@app/common'
import { IOrderObject } from '@app/database'

export class GetFriendRequestsDto {
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  page?: number

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  perPage?: number

  @ApiPropertyOptional({ description: getOrderingDescription(FRIEND_REQUESTS_SORT_FIELDS) })
  @IsString()
  @IsOptional()
  ordering?: string

  userId: number
  order?: IOrderObject
}

export class AcceptRequestDto {
  @ApiProperty()
  @IsNumber()
  userId: number
}

export class DeclineRequestDto {
  @ApiProperty()
  @IsNumber()
  userId: number
}
