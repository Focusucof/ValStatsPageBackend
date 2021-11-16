import axios from 'axios';
import login from './login';
import { config } from 'dotenv';

config();

async function main() {
    //@ts-ignore
    const userDetails = await login();
    console.log(userDetails);
}

main();