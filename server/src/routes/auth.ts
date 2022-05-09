import { NextFunction, Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { injectable, inject } from 'inversify';
// import CryptoJS from 'crypto-js';

// import { HttpException } from '@entities';
import { IController } from '@interfaces';
// import { ErrorCodes } from '@enums';
import { TYPES } from '@types';
// import { IAuthService } from '@services';
// import { IAuthMiddleware } from '@middlewares';


@injectable()
class AuthController implements IController {
    private _router = Router();
    // private _authService: IAuthService;
    // private _authMiddleware: IAuthMiddleware;

    constructor(
        // @inject(TYPES.AuthService) authService: IAuthService,
        // @inject(TYPES.AuthMiddleware) authMiddleware: IAuthMiddleware,
    ) {
        // this._authService = authService;
        // this._authMiddleware = authMiddleware;

        this.initRoutes();
    }


    getRouter(): Router {
        return this._router;
    }

    initRoutes() {
        this._router.post('/login', this.getAuthTokenController);
        // this._router.post('/auto-login', this._authMiddleware.authOnly, this.autoLoginController);
    }


    public getAuthTokenController = async (req: Request, res: Response, next: NextFunction) => {
        const { username, password } = req.body;

        try {
            // const user = await this._authService.getAuthUser(username);
            // if (!user) {
            //     throw new HttpException(StatusCodes.UNAUTHORIZED, ErrorCodes.INVALID_USERNAME_OR_PASSWORD)
            // }
            // const passwordHashed = CryptoJS.SHA256(password).toString();
        
            // if (!(passwordHashed === user.password)) {
            //     throw new HttpException(StatusCodes.UNAUTHORIZED, ErrorCodes.INVALID_USERNAME_OR_PASSWORD)
            // }
            // const token = await this._authService.generateToken({ authorizedUser: username });

            // res.setHeader('jwt-token', token);
            // return res.json({ authUsername: username })
        } catch (err: any) {
            return next(err);
        }
    }

    public autoLoginController = async (req: any, res: Response, next: NextFunction) => {
        return res.json(req.user);
    }

}


export { AuthController };