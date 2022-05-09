import { NextFunction, Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';


export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || err.response?.status || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || err.response?.message || 'Unknown error';

  const resBody: any = {
    message
  };

  res.status(status).json(resBody);
};

