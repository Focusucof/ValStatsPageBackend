import axios, { AxiosInstance } from 'axios';
import login from './login';
import getMatchHistory from './matchHistory';
import { userDetails } from './globals';
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
var userDetails: userDetails;

app.get('/', async function (req, res) {
    //@ts-ignore
    userDetails = await login();
    res.sendStatus(200);
});

app.get('/match-history', async function(req, res) {
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
    res.send(matchHistory);
});

app.listen(1337, () => {
    console.log('listening on port 3000');
});

async function main() {   
    //@ts-ignore
    const userDetails: userDetails = await login();

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

//main();