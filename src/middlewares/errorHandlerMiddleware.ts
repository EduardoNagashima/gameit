import { NextFunction, Request, Response } from "express";

export default function errorHandler(error, req: Request, res: Response, next: NextFunction) {
    let statusCode = 500;
    console.log(error);
    if (error == 'JsonWebTokenError: invalid signature') {
        return res.status(401).send('Erro, token inválido.');
    }
    if (error.type) {
        if (error.type === 'BAD_REQUEST') statusCode = 400;
        if (error.type === 'NOT_FOUND') statusCode = 404;
        if (error.type === 'CONFLICT') statusCode = 409;
        if (error.type === 'UNAUTHORIZED') statusCode = 401;
        return res.status(statusCode).send(error.message);
    }

    res.status(statusCode).send(error);
}