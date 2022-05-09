import { NextFunction, Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { injectable, inject } from 'inversify';


import { TYPES } from '@types';
import { IController } from '@interfaces';


@injectable()
class AuthController implements IController {
  private _router = Router();
//   private _authService: IAuthService;
//   private _authMiddleware: IAuthMiddleware;

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
    this._router.post('/signup', this.signUpController);
    // this._router.post('/auto-login', this._authMiddleware.authOnly, this.autoLoginController);
  }


  public signUpController = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password, email } = req.body;

    console.log(39);
    console.log(username, password, email);
    
    

    try {
    //   const user = await this._authService.getAuthUser(username);
    //   if (!user) {
    //     throw new HttpException(StatusCodes.UNAUTHORIZED, ErrorCodes.INVALID_USERNAME_OR_PASSWORD)
    //   }
    //   const passwordHashed = CryptoJS.SHA256(password).toString();

    //   if (!(passwordHashed === user.password)) {
    //     throw new HttpException(StatusCodes.UNAUTHORIZED, ErrorCodes.INVALID_USERNAME_OR_PASSWORD)
    //   }

    //   const token = await this._authService.generateToken({ authorizedUser: username, roles: user.roles });

    //   res.setHeader('jwt-token', token);

      return res.json({ authUsername: 'aaaa'})
    } catch (err: any) {
      return next(err);
    }
  }

//   public autoLoginController = async (req: CustomRequest, res: Response, next: NextFunction) => {
//     return res.json(req.user);
//   }

}


export { AuthController };