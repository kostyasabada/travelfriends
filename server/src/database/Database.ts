import chalk from 'chalk';
import mongoose from 'mongoose';
import User from './models/user';
// const User = require('@models/user');

// import { createConnection, Connection, getRepository } from 'typeorm';
// import { Users, IntegratorConfigSets, PublisherConfigSets, UserRoles } from '@models';

class Database {
    async createConnection() {
        try {
          const conection = await mongoose.connect('mongodb+srv://kostya:s1a2b3@cluster0.j2sls.mongodb.net/chat', {});

          



        // const connection: Connection = await createConnection({
        //         name: 'default',
        //         host: process.env.DATABASE_HOST,
        //         type: process.env.DATABASE_DIALECT as 'postgres',
        //         port: +(process.env.DATABASE_PORT as string),
        //         database: process.env.DATABASE_NAME,
        //         logging: false,
        //         username: process.env.DATABASE_USER_NAME,
        //         password: process.env.DATABASE_USER_PASSWORD,
        //         synchronize: true,
        //         migrations: [
        //             __dirname +  '/migrations/*{.ts,.js}'
        //         ],
        //         entities: [Users,  IntegratorConfigSets, PublisherConfigSets, UserRoles]
        //     });
            // await connection.runMigrations();
            console.log(chalk.green('Connection with database was successfully established!'));
        } catch(err) {
            console.log(chalk.red('Problem with connection to db:', err));
        }
    }

    async insertDBRecords(): Promise<void> {

      const users = await User.find({});


      // if (users.length === 0) {
      //       const { GLOBAL_ADMIN_ROLE, GLOBAL_ADMIN_NAME, GLOBAL_ADMIN_PASSWORD } = process.env;
      //       const role = userRolesRepository.create({ role: GLOBAL_ADMIN_ROLE });
      //       await userRolesRepository.save(role);

      //       const user = usersRepository.create({ 
      //           username: GLOBAL_ADMIN_NAME,
      //           password: GLOBAL_ADMIN_PASSWORD,
      //           roles: [role]
      //        });
      //        await usersRepository.save(user)
      //   }
      
        // const usersRepository = getRepository(Users);
        // const userRolesRepository = getRepository(UserRoles);
        // const users = await usersRepository.find();
        
        // if (users.length === 0) {
        //     const { GLOBAL_ADMIN_ROLE, GLOBAL_ADMIN_NAME, GLOBAL_ADMIN_PASSWORD } = process.env;
        //     const role = userRolesRepository.create({ role: GLOBAL_ADMIN_ROLE });
        //     await userRolesRepository.save(role);

        //     const user = usersRepository.create({ 
        //         username: GLOBAL_ADMIN_NAME,
        //         password: GLOBAL_ADMIN_PASSWORD,
        //         roles: [role]
        //      });
        //      await usersRepository.save(user)
        // }
    }
}

export default new Database();