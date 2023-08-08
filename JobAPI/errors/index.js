const CustomAPIError = require('./custom-error')
const BadRequestError = require('./bad-request')
const UnauthenticatedError = require('./unauthenticated')
const NotFoundError = require('./not-found')
const Forbidden = require('./forbidden')

module.exports = {CustomAPIError, BadRequestError, UnauthenticatedError, NotFoundError, Forbidden}