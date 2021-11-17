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
            for(let j = 0; j < response.data.players.length; j++) {
                if(response.data.players[j].subject == puuid) {
                    var gameinfo;
                    if(response.data.players[j].teamId == 'Blue') {
                        gameinfo = {
                            teamScore: response.data.teams[1].roundsWon,
                            enemyScore: response.data.teams[0].roundsWon,
                            kills: response.data.players[j].stats.kills,
                            deaths: response.data.players[j].stats.deaths,
                            assists: response.data.players[j].stats.assists,
                            score: response.data.players[j].stats.score,
                        };
                    } else {
                        gameinfo = {
                            teamScore: response.data.teams[0].roundsWon,
                            enemyScore: response.data.teams[1].roundsWon,
                            kills: response.data.players[j].stats.kills,
                            deaths: response.data.players[j].stats.deaths,
                            assists: response.data.players[j].stats.assists,
                            score: response.data.players[j].stats.score,
                        };
                    }
                    matchDetails.push(gameinfo);
                }
            }
        });
    }
    
    //console.log(JSON.stringify(matchDetails))

    return matchDetails;
}