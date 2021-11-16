import axios, { Axios, AxiosInstance } from 'axios';

export default async function getMatchHistory(puuid: string, pdRequest: AxiosInstance) {
    var matchHistory;

    await pdRequest.get(`match-history/v1/history/${puuid}?startIndex=0&endIndex=4&queue=competitive`).then(response => {
        matchHistory = response.data;
    });

    return matchHistory;
}