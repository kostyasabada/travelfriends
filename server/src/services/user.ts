import { injectable } from 'inversify';
import User from 'src/database/models/user';

export interface IUserService {
  loginUser(user:any): any;
}


@injectable()
class UserService implements IUserService {
  public constructor() {}

  public async loginUser(credentials: any) {
    const { username, password } = credentials;

    try {
      const fetchedUser = await User.findOne({
        name: username,
        password
      });

      if(!fetchedUser) {
        return
      }

      const accessToken = Buffer.from(`${fetchedUser.name}:${fetchedUser.password}`).toString('base64');

      const user = {
        name: fetchedUser.name,
        password: fetchedUser.password,
        email: fetchedUser.email,
        accessToken
      }

      return user;
    } catch (err: any) {
      return;
    }
  }
}

export { UserService };