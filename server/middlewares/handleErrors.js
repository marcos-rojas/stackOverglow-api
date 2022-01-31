const ERROR_HANDLERS = {
    CastError: res =>
        {res.status(400);
        res.send({ error: 'id used is malformed' })},

    ValidationError: (res, { message }) =>
        {res.status(409);
        res.send({ error: message })},

    JsonWebTokenError: (res) =>
        res.json({ error: 'token missing or invalid' }),

    TokenExpirerError: res =>
        {res.status(401);
        res.json({ error: 'token expired' })},

    defaultError: (res, error) => {
        res.status(404)
        res.send({ error: 'Problemas con el servidor' })
        res.end()
    }
}

module.exports = (error, request, response, next) => {
    console.log('verificando tipo de error')
    const handler =
        ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError
    handler(response, error)
}