import axios, { Axios, AxiosInstance } from 'axios';

export default async function getMatchHistory(puuid: string, pdRequest: AxiosInstance) {
    var matchHistory;
    var matchIDs: string[] = [];

    await pdRequest.get(`match-history/v1/history/${puuid}?startIndex=0&endIndex=5&queue=competitive`).then(response => {
        matchHistory = response.data.History;
        for(let i = 0; i < matchHistory.length; i++) {
            matchIDs.push(matchHistory[i].MatchID);
        }
    });  
    

    return matchIDs;
}