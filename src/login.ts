const axios = require('axios').default;
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');
const fs = require('fs');

export default async function login(username: string, password: string) {

    var userDetails = {
        access_token: "",
        entitlements: "",
        puuid: ""
    };

    axiosCookieJarSupport(axios);
    const cookieJar = new tough.CookieJar();

    let data = {
        'client_id': 'play-valorant-web-prod',
        'nonce': '1',
        'redirect_uri': 'https://playvalorant.com/opt_in',
        'response_type': 'token id_token'
    };

    await axios.post('https://auth.riotgames.com/api/v1/authorization', data, {jar: cookieJar, withCredentials: true}).then(async (response: any) => {
        var data = {
            'type': 'auth',
            'username': username,
            'password': password
        };

        await axios.put('https://auth.riotgames.com/api/v1/authorization', data, {jar: cookieJar, withCredentials: true}).then(async (response: any) => {
            let uri = response.data.response.parameters.uri;
            let strTokens = uri.replace('https://playvalorant.com/opt_in#', '').split('&');

            let arrayTokens: any = {};
            strTokens.forEach((token: any) => {
                arrayTokens[token.split('=')[0]] = token.split('=')[1];
            });

            userDetails.access_token = arrayTokens.access_token;

            let headers = {
                'Authorization': 'Bearer ' + arrayTokens.access_token
            };

            await axios.post('https://entitlements.auth.riotgames.com/api/token/v1', {}, {jar: cookieJar, withCredentials: true, headers}).then(async (response: any) => {
                userDetails.entitlements = response.data;

                await axios.post('https://auth.riotgames.com/userinfo', {}, {jar: cookieJar, withCredentials: true, headers}).then(async (response: any) => {
                    userDetails.puuid = response.data.sub;
                });
            });
            
        });
    }).then(async (response: any) => {
        return userDetails;
    });
    return userDetails;
}