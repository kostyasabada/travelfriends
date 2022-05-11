import { injectable, inject } from 'inversify';
import { Router } from "express";

import { TYPES } from "@types";
import { IController } from "@interfaces";
// import { IAuthMiddleware } from '@middlewares';


@injectable()
class BaseController implements IController {
    private _router = Router();
    private _userController: IController;


    constructor(

        @inject(TYPES.UserController) userController: IController,

    ) {

        this._userController = userController;

        this.initRoutes();
    }

    getRouter() {
        return this._router;
    }

    initRoutes() {
        this._router.use('/user', this._userController.getRouter());
    }
}


export { BaseController };