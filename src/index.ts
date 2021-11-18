import axios, { AxiosInstance } from 'axios';
import login from './login';
import getMatchHistory from './matchHistory';
import getRank from './rankInfo';
import getLeaderboardPlace from './getLeaderboardPlace';
import { userDetails } from './globals';
import express, { response } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
var userDetails: userDetails;

app.get('/', async function (req, res) {
    //@ts-ignore
    userDetails = await login(process.env.USER, process.env.PASSWORD);
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

app.get('/rank-info', async function(req, res) {
    const pdRequest: AxiosInstance = axios.create({
        baseURL: 'https://pd.na.a.pvp.net/',
        method: 'GET',
        headers: {
            'X-Riot-Entitlements-JWT': userDetails.entitlements,
            'X-Riot-ClientPlatform': 'ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9',
            'Authorization': 'Bearer ' + userDetails.access_token,
            'X-Riot-ClientVersion': 'release-03.09-shipping-13-629826'
        }
    });
    
    let rank = await getRank(userDetails.puuid, pdRequest);

    var leaderboardPlace;
    var rankInfo;
    if(rank.rankID > 20) {
        await getLeaderboardPlace(userDetails.puuid, pdRequest).then(response => {
            leaderboardPlace = response;
        });
        rankInfo = {
            rank: rank.rank,
            leaderboardPlace: leaderboardPlace
        };
    } else {
        rankInfo = {
            rank: rank.rank
        };
    }
    res.send(rankInfo);
});

app.listen(1337, () => {
    console.log('listening on port 8080');
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
