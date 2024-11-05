import ApiError from '../exceptions/apiError.js'

const ErrorMiddleware = function (err, req, res, next) {
    console.log(err)
    if (err instanceof ApiError) {
        return res
            .status(err.status)
            .json({ message: err.message, errors: err.errors })
    }
    return res.status(500).json({ message: 'Unknown error on server' })
}

export default ErrorMiddleware
