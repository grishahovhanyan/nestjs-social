import { VALIDATION_MESSAGES, ERROR_MESSAGES } from '@app/common'
import { paginatedResponseProperties, friendProperties } from './schema-properties'

const BAD_REQUEST_DESCRIPTION = 'Bad Request'

const arrayProperty = (key: string, example: string[]) => ({
  [key]: {
    type: 'array',
    items: { type: 'string' },
    example
  }
})

export const SWAGGER_SCHEMAS = {
  // ******* Exceptions *******
  registerValidationException: {
    description: BAD_REQUEST_DESCRIPTION,
    schema: {
      properties: {
        ...arrayProperty('firstName', [VALIDATION_MESSAGES.required, VALIDATION_MESSAGES.invalidString]),
        ...arrayProperty('lastName', [VALIDATION_MESSAGES.required, VALIDATION_MESSAGES.invalidString]),
        ...arrayProperty('email', [VALIDATION_MESSAGES.required, VALIDATION_MESSAGES.invalidString]),
        ...arrayProperty('birthDate', [VALIDATION_MESSAGES.required, VALIDATION_MESSAGES.invalidISOFormat]),
        ...arrayProperty('password', [VALIDATION_MESSAGES.required, VALIDATION_MESSAGES.invalidString]),
        ...arrayProperty('confirmPassword', [VALIDATION_MESSAGES.required, VALIDATION_MESSAGES.invalidString]),
        ...arrayProperty('nonFieldErrors', [ERROR_MESSAGES.userAlreadyExists])
      }
    }
  },
  loginValidationException: {
    description: BAD_REQUEST_DESCRIPTION,
    schema: {
      properties: {
        ...arrayProperty('email', [VALIDATION_MESSAGES.required, VALIDATION_MESSAGES.invalidString]),
        ...arrayProperty('password', [VALIDATION_MESSAGES.required, VALIDATION_MESSAGES.invalidString]),
        ...arrayProperty('nonFieldErrors', [VALIDATION_MESSAGES.invalidEmailPassword])
      }
    }
  },
  addFriendValidationException: {
    description: BAD_REQUEST_DESCRIPTION,
    schema: {
      properties: {
        ...arrayProperty('nonFieldErrors', [ERROR_MESSAGES.requestHasAlreadyBeenSent, ERROR_MESSAGES.alreadyFriends])
      }
    }
  },
  // **************************
  loginResponse: { schema: { properties: { accessToken: { type: 'string' } } } },
  paginatedResponse: (itemProperties) => ({
    schema: { properties: paginatedResponseProperties(itemProperties) }
  }),
  getFriendResponse: { schema: { properties: friendProperties } }
}
