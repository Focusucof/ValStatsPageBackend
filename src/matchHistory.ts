import axios, { Axios, AxiosInstance } from 'axios';

export default async function getMatchHistory(puuid: string, pdRequest: AxiosInstance) {
    var matchHistory;
    var matchIDs: string[] = [];
    var matchDetails: any[] = [];

    await pdRequest.get(`match-history/v1/history/${puuid}?startIndex=0&endIndex=5&queue=competitive`).then(response => {
        matchHistory = response.data.History;
        for(let i = 0; i < matchHistory.length; i++) {
            matchIDs.push(matchHistory[i].MatchID);
        }
    });
    
    for(let i = 0; i < matchIDs.length; i++) {
        await pdRequest.get(`match-details/v1/matches/${matchIDs[i]}`).then(response => {
            for(let j = 0; j < response.data[i].length; i++) {
                if(response.data[i].players[j].subject == puuid) {
                    matchDetails.push(response.data[i].players[j])
                    console.log(response.data[i].players[j]);
                }
            }
            matchDetails.push(response.data);
        });
    }
    
    console.log(JSON.stringify(matchDetails))

    return matchIDs;
}