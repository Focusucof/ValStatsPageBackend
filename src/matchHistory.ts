import axios, { Axios, AxiosInstance } from 'axios';

export default async function getMatchHistory(puuid: string, access_token: string, entitlements: string) {
    var matchHistory;

    const requestBase: AxiosInstance = axios.create({
        baseURL: 'https://pd.na.a.pvp.net/',
        method: 'GET',
        headers: {
            'X-Riot-Entitlements-JWT': entitlements,
            'X-Riot-ClientPlatform': 'ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9',
            'Authorization': 'Bearer ' + access_token
        }
    });
    await axios.get(`https://pd.na.a.pvp.net/match-history/v1/history/${puuid}?startIndex=0&endIndex=4&queue=competitive`, {
        headers: {
            'X-Riot-Entitlements-JWT': entitlements,
            'X-Riot-ClientPlatform': 'ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9',
            'Authorization': 'Bearer ' + access_token
        }
    }).then(response => {
        matchHistory = response.data;
    });
    return matchHistory;
}