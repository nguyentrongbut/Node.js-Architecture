'use strict'

const Status = {
    FORBIDDEN: 403,
    CONFLICT: 409,
}

const ReasonStatusCode = {
    FORBIDDEN: 'bad request error',
    CONFLICT: 'Conflict error',
}

class ErrorResponse extends Error {

    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.CONFLICT, statusCode = Status.CONFLICT) {
        super(message, statusCode);
    }
}

class BadRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.FORBIDDEN, statusCode = Status.FORBIDDEN) {
        super(message, statusCode);
    }
}

module.exports = {
    ConflictRequestError,
    BadRequestError
}