export default function errorHandler(error, req, res, next) {
    var statusCode = 500;
    if (error == 'JsonWebTokenError: invalid signature') {
        return res.status(401).send('Erro, token inválido.');
    }
    if (error.type) {
        if (error.type === 'BAD_REQUEST')
            statusCode = 400;
        if (error.type === 'NOT_FOUND')
            statusCode = 404;
        if (error.type === 'CONFLICT')
            statusCode = 409;
        if (error.type === 'UNAUTHORIZED')
            statusCode = 401;
        return res.status(statusCode).send(error.message);
    }
    res.status(statusCode).send('Houve algum problema na aplicação, por favor tente novamente.');
}
