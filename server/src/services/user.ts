import { injectable } from 'inversify';
import User from 'src/database/models/user';
import { UserInterface } from 'src/interfaces/user.interface';

export interface IUserService {
  loginUser(credentials: {username: string, password: string}): Promise<UserInterface | undefined>;
}


@injectable()
class UserService implements IUserService {
  public constructor() {}

  public async loginUser(credentials: {username: string, password: string}): Promise<UserInterface | undefined> {
    const { username, password } = credentials;

    try {
      const fetchedUser = await User.findOne({
        name: username,
        password
      });

      if(!fetchedUser) {
        return;
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