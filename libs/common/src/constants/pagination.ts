export const PAGE_SIZE_TYPES = {
  users: 'users',
  friends: 'friends',
  friendRequests: 'friendRequests'
}

export const PAGE_SIZES = {
  usersPageSize: Number(process.env.USERS_PAGE_SIZE) || 50,
  friendsPageSize: Number(process.env.FRIENDS_PAGE_SIZE) || 50,
  friendRequestsPageSize: Number(process.env.FRIEND_REQUESTS_PAGE_SIZE) || 50
}

export const MAX_PAGE_SIZES = {
  usersMaxPageSize: Number(process.env.USERS_MAX_PAGE_SIZE) || 200,
  friendsMaxPageSize: Number(process.env.FRIENDS_MAX_PAGE_SIZE) || 200,
  friendRequestsMaxPageSize: Number(process.env.FRIEND_REQUESTS_MAX_PAGE_SIZE) || 200
}

export function getPageSize(type: string, querySize?: number) {
  const maxSize = MAX_PAGE_SIZES[`${type}MaxPageSize`]
  const defaultSize = PAGE_SIZES[`${type}PageSize`]

  return Number(querySize) && Number(querySize) <= maxSize ? Number(querySize) : defaultSize
}

export function getPagesForResponse(totalCount: number, page: number, perPage: number) {
  const numPages = Math.ceil(totalCount / perPage)

  return {
    next: page + 1 > numPages ? null : page + 1,
    previous: page - 1 < 1 ? null : page - 1,
    current: page,
    numPages,
    perPage
  }
}

export function paginatedResponse(totalCount: number, page: number, perPage: number, results) {
  return {
    pages: getPagesForResponse(totalCount, page, perPage),
    count: results.length,
    results
  }
}
