/**
 * @extends Error
 */
class ExtendableError extends Error {
  constructor(statusCode, message, isPublic) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    this.statusCode = statusCode
    this.isPublic = isPublic
  }
}

/**
 * @param {number} status
 * @param {string} message
 */
class APIError extends ExtendableError {
  constructor(statusCode = 500, message = '服务器错误', isPublic = false) {
    super(statusCode, message, isPublic)
  }
}

module.exports = APIError
