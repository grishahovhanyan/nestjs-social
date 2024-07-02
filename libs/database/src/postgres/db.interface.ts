import { FindOptionsOrder, FindOptionsWhere } from 'typeorm'

export interface IDbTables {
  Users: 'users'
  Friends: 'friends'
  FriendRequests: 'friend_requests'
}

export interface IOrderObject {
  [key: string]: 'ASC' | 'DESC'
}

export interface IGetAndCountInput {
  page: number
  perPage: number
  order: IOrderObject
}

export interface IFindAndCountInput<T> {
  conditions: FindOptionsWhere<T>
  relations?: string[]
  take: number
  skip: number
  order?: FindOptionsOrder<T>
}

export interface IFindAndCountOutput<T> {
  items: T[]
  totalCount: number
}

export interface IFindInput {
  relations?: string[]
}

export interface IFriendRequestFriendDetail {
  color: string
  quantity: number
}

export interface IOrderFriendDetail {
  color: string
  quantity: number
  price: number
}
