import { injectable, inject } from 'inversify';
import { Router } from "express";

import { TYPES } from "@types";
import { IController } from "@interfaces";
// import { IAuthMiddleware } from '@middlewares';


@injectable()
class BaseController implements IController {
    private _router = Router();
    // private _adminController: IController;
    // private _authController: IController;
    // private _gitController: IController;
    // private _integratorController: IController;
    // private _authMiddleware: IAuthMiddleware;

    constructor(
        // @inject(TYPES.AdminController) adminController: IController,
        // @inject(TYPES.AuthController) authController: IController,
        // @inject(TYPES.GitController) gitController: IController,
        // @inject(TYPES.IntegratorController) integratorController: IController,
        // @inject(TYPES.AuthMiddleware) authMiddleware: IAuthMiddleware,
    ) {
        // this._adminController = adminController;
        // this._authController = authController;
        // this._gitController = gitController;
        // this._integratorController = integratorController;
        // this._authMiddleware = authMiddleware;

        this.initRoutes();
    }

    getRouter() {
        return this._router;
    }

    initRoutes() {
        // this._router.use('/git', this._authMiddleware.authOnly, this._gitController.getRouter());
        // this._router.use('/integrator', this._authMiddleware.authOnly, this._integratorController.getRouter());
        // this._router.use('/auth', this._authController.getRouter());
        // this._router.use('/admin', this._adminController.getRouter());
    }
}


export { BaseController };