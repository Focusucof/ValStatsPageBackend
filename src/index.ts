import axios from 'axios';
import login from './login';
import { userDetails } from './globals';

async function main() {
    //@ts-ignore
    const userDetails: userDetails = await login();
    console.log(userDetails);
}

main();