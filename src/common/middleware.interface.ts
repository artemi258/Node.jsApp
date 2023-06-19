import { NextFunction, Router, Request, Response } from 'express';

export interface IMiddleware {
	excute: (req: Request, res: Response, next: NextFunction) => void;
}
