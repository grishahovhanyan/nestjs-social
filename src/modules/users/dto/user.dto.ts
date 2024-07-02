import { ApiPropertyOptional } from '@nestjs/swagger'
import { getOrderingDescription } from '@app/swagger'
import { USERS_SORT_FIELDS } from '@app/common'
import { IOrderObject } from '@app/database'

export class GetUsersDto {
  @ApiPropertyOptional()
  page?: number

  @ApiPropertyOptional()
  perPage?: number

  @ApiPropertyOptional({ description: getOrderingDescription(USERS_SORT_FIELDS) })
  ordering?: string

  @ApiPropertyOptional({ description: 'Text for searching' })
  searchText?: string

  @ApiPropertyOptional({ description: 'birthDate greater than equal (Must be in ISO date format)' })
  birthDateGte?: string

  @ApiPropertyOptional({ description: 'birthDate less than equal (Must be in ISO date format)' })
  birthDateLt?: string

  @ApiPropertyOptional({ description: 'ageGte greater than equal' })
  ageGte?: number

  @ApiPropertyOptional({ description: 'ageLt less than equal' })
  ageLt?: number

  order?: IOrderObject
  userIdsToExclude?: number[]
  userIdsToInclude?: number[]
}

export class CreateUserDto {
  firstName: string
  lastName: string
  birthDate: Date
  email: string
  password: string
}
