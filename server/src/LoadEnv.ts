import dotenv from 'dotenv';
import commandLineArgs from 'command-line-args';
import path from 'path';
import chalk from 'chalk';

const loadEnv = (options: commandLineArgs.CommandLineOptions) => {

    console.log('Loading configuration...');
    console.log('Loading default configuration...');

    const config = dotenv.config({
        path: path.join(__dirname, '..', 'env', 'default.env')
    });

    console.log(''); // new line

    
    process.env = {
        ...process.env,
        ...config.parsed
    };

    console.log(chalk.green('Configuration loaded successfully'));
    console.log('====== LOADING CONFIGURATION END ================================');

}


export default loadEnv;