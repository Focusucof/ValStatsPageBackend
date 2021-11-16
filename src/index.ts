import axios, { AxiosInstance } from 'axios';
import login from './login';
import getMatchHistory from './matchHistory';
import { userDetails } from './globals';
import { match } from 'assert';

async function main() {
    //@ts-ignore

    

    const userDetails: userDetails = await login();
    console.log(userDetails);

    const pdRequest: AxiosInstance = axios.create({
        baseURL: 'https://pd.na.a.pvp.net/',
        method: 'GET',
        headers: {
            'X-Riot-Entitlements-JWT': userDetails.entitlements,
            'X-Riot-ClientPlatform': 'ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9',
            'Authorization': 'Bearer ' + userDetails.access_token
        }
    });

    let matchHistory = await getMatchHistory(userDetails.puuid, pdRequest);
    console.log(matchHistory);
}

main();