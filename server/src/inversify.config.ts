import { Container } from 'inversify';

import {
    UserController,
    BaseController,
} from '@controllers';
import { TYPES } from '@types';
import { IController,  } from '@interfaces';
import { IServer, Server } from '@server';
import { ISocketService, SocketService } from './services/socket';
import { IUserService, UserService } from './services/user';

const diContainer = new Container();

diContainer.bind<IServer>(TYPES.Server).to(Server).inSingletonScope();

diContainer.bind<IController>(TYPES.UserController).to(UserController);
diContainer.bind<IController>(TYPES.BaseController).to(BaseController);

diContainer.bind<ISocketService>(TYPES.SocketService).to(SocketService);
diContainer.bind<IUserService>(TYPES.UserService).to(UserService);

export { diContainer };