import { IDbTables } from './db.interface'

export const DB_TABLES: IDbTables = {
  Users: 'users',
  Friends: 'friends',
  FriendRequests: 'friend_requests'
}

export const DB_RELATIONS = {
  user: 'user',
  friend: 'friend'
}
