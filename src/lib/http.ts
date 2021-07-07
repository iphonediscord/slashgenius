import axios from 'axios'
import querystring from 'querystring';
import { InteractionResponse, Token } from '../types';

import { CLIENT_ID, CLIENT_SECRET } from './authentication.js';

const getTokenResponse = async (): Promise<Token> => {
    let response = await axios(`https://discord.com/api/v8/oauth2/token`, {
        method: 'post',
        data: querystring.stringify({ 'grant_type': 'client_credentials', 'scope': 'applications.commands.update' }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        auth: {
            username: CLIENT_ID,
            password: CLIENT_SECRET
        }
    });

    let token: Token = {
        access_token: response.data.access_token,
        expires_at: (response.data.expires_in + Math.round(Date.now() / 1000))
    }
    return token;
}

const editInteractionResponse = async (token: string, response: InteractionResponse) => {

}

export { getTokenResponse }