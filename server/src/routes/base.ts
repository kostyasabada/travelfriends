import { injectable, inject } from 'inversify';
import { Router } from "express";

import { TYPES } from "@types";
import { IController } from "@interfaces";
// import { IAuthMiddleware } from '@middlewares';


@injectable()
class BaseController implements IController {
    private _router = Router();

    private _authController: IController;


    constructor(

        @inject(TYPES.AuthController) authController: IController,

    ) {

        this._authController = authController;

        this.initRoutes();
    }

    getRouter() {
        return this._router;
    }

    initRoutes() {

        this._router.use('/auth', this._authController.getRouter());

    }
}


export { BaseController };