import axios, { AxiosInstance } from 'axios';

export default async function getLeaderboardPlace(puuid: string, pdRequest: AxiosInstance) {
    var leaderboardPlace;
    await pdRequest.get(`mmr/v1/leaderboards/affinity/na/queue/competitive/season/a16955a5-4ad0-f761-5e9e-389df1c892fb?startIndex=0&size=5&query=Focus`).then(response => {
        for(let i = 0; i < response.data.Players.length; i++) {
            if(response.data.Players[i].puuid == puuid) {
                leaderboardPlace = response.data.Players[i].leaderboardRank;
            }
        }
    });
    return leaderboardPlace;
}