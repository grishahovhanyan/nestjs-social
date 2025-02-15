export const SORT_DIRECTIONS = {
  ascending: 'ASC',
  descending: 'DESC'
}

export const USERS_SORT_FIELDS = ['id', 'birthDate']
export const FRIENDS_SORT_FIELDS = ['id', 'acceptedAt', 'createdAt']
export const FRIEND_REQUESTS_SORT_FIELDS = ['id', 'acceptedAt', 'createdAt']

export function getSortOrderFromQuery(queryOrdering: string[], allowedSortFields: string[]) {
  const sortOrder = queryOrdering.reduce((orderObject, sortField) => {
    let sortDirection = SORT_DIRECTIONS.ascending
    if (sortField.startsWith('-')) {
      sortDirection = SORT_DIRECTIONS.descending
      sortField = sortField.slice(1)
    }

    if (allowedSortFields.includes(sortField)) {
      orderObject[sortField] = sortDirection
    }
    return orderObject
  }, {})

  return sortOrder
}
