import { Container } from 'inversify';

import {
    AuthController,
    BaseController,
} from '@controllers';
import { TYPES } from '@types';
import { IController,  } from '@interfaces';
import { IServer, Server } from '@server';

const diContainer = new Container();



diContainer.bind<IController>(TYPES.AuthController).to(AuthController);

diContainer.bind<IController>(TYPES.BaseController).to(BaseController);

diContainer.bind<IServer>(TYPES.Server).to(Server).inSingletonScope();







export { diContainer };