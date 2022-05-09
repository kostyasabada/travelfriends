import { Container } from 'inversify';

import {
//     AdminController,
//     AuthController,
    BaseController,
//     GitController,
//     IntegratorController
} from '@controllers';
// import { AdminService, AuthService, GitCallsService, GitService, 
//         IAdminService, IAuthService, IGitCallsService, IGitService,
//         IIntegratorService, IntegratorService 
//        } from '@services';
import { TYPES } from './@types';
import { IController } from './interfaces/controller.interface';
// import { IController, IRepository } from '@interfaces';
// import { IntegratorConfigSets, Users } from '@models';
// import { IntegratorConfigSetsRepository, UsersRepository } from '@repositories';
import { IServer, Server } from './Server';
// import { AuthMiddleware, IAuthMiddleware } from '@middlewares';


const diContainer = new Container();

diContainer.bind<IServer>(TYPES.Server).to(Server).inSingletonScope();
diContainer.bind<IController>(TYPES.BaseController).to(BaseController);










export { diContainer };