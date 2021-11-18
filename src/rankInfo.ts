import axios, { AxiosInstance } from 'axios';
import { response } from 'express';
//import { rankTable } from './globals';

const rankArray = [ "Unrated", "Unknown 1", "Unknown 2", 
                    "Iron 1", "Iron 2", "Iron 3", 
                    "Bronze 1", "Bronze 2", "Bronze 3", 
                    "Silver 1", "Silver 2", "Silver 3", 
                    "Gold 1", "Gold 2", "Gold 3",
                     "Platinum 1", "Platinum 2", "Platinum 3", 
                     "Diamond 1", "Diamond 2", "Diamond 3", 
                     "Immortal 1", "Immortal 2", "Immortal 3", 
                     "Radiant" ];

export default async function getRank(puuid: string, pdRequest: AxiosInstance) {
    var rankID: number = 0;
    var rank;
    var leaderboardPlace;
    await pdRequest.get(`mmr/v1/players/${puuid}/competitiveupdates?startIndex=0&endIndex=1&queue=competitive`).then(response => {
        rankID = response.data.Matches[0].TierAfterUpdate;
        rank = rankArray[rankID];
    });
    return {
        rank: rank,
        rankID: rankID
    };
}