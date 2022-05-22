import { NextFunction, Router, Request, Response } from 'express';
import { injectable } from 'inversify';
import { IController } from '@interfaces';
import User from '../database/models/user';

@injectable()
class UserController implements IController {
  private _router = Router();

  constructor(
  ) {
    this.initRoutes();
  }


  getRouter(): Router {
    return this._router;
  }

  initRoutes() {
    this._router.post('/signup', this.signUpController);
    this._router.get('/login', this.loginController);
    this._router.get('/userlist', this.userListController);
  }

  public signUpController = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password, email } = req.body;

    try {
      const user = new User({
        name: username,
        password,
        email
      });

      await user.save();

      return res.json({ status: 'ok' })
    } catch (err: any) {
      return next(err);
    }
  }

  public loginController = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.query;

    try {

      const fetchedUser = await User.findOne({
        name: username,
        password
      });
      const accessToken = Buffer.from(`${fetchedUser.name}:${fetchedUser.password}`).toString('base64');
 
      const user = {
        name: fetchedUser.name,
        password: fetchedUser.password,
        email: fetchedUser.email,
        accessToken
      }


      if(!user) {
        throw Error('Not found')
      }

      return res.json(user)
    } catch (err: any) {
      return next(err);
    }
  }

  public userListController = async (req: Request, res: Response, next: NextFunction) => {

   try {

      const fetchedUsers = await User.find();

      const users = fetchedUsers.map(user => {
        return {
          name: user.name,
          email: user.email
        }
      })

      return res.json(users)
    } catch (err: any) {
      return next(err);
    }
  }

}


export { UserController };