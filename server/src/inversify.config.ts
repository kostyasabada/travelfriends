import { Container } from 'inversify';

import {
    UserController,
    BaseController,
} from '@controllers';
import { TYPES } from '@types';
import { IController,  } from '@interfaces';
import { IServer, Server } from '@server';

const diContainer = new Container();



diContainer.bind<IController>(TYPES.UserController).to(UserController);

diContainer.bind<IController>(TYPES.BaseController).to(BaseController);

diContainer.bind<IServer>(TYPES.Server).to(Server).inSingletonScope();







export { diContainer };