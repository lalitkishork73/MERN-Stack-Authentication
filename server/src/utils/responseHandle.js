export function ErrorCode(res, code, message) {
    return res.status(code).send({ message: message })
}

export function SuccessCode(res, code, message, data) {
    return res.status(code).send({ message: message, data: data })
}