import dotenv from 'dotenv';

import axios from 'axios';
import querystring from 'querystring';

<<<<<<< Updated upstream
let PUBLIC_KEY: string = "808e1ba34b0ba4940e8cb60a1fc945433a2d2b1f38ba747e7827bb02c09a23fc";
let CLIENT_ID: string;
let CLIENT_SECRET: string;
=======
import { Token } from '../types';

let PUBLIC_KEY: string = "808e1ba34b0ba4940e8cb60a1fc945433a2d2b1f38ba747e7827bb02c09a23fc";
let CLIENT_ID: string;
let CLIENT_SECRET: string;
let DB_URI: string;
>>>>>>> Stashed changes

let initialised: boolean;

const initialiseEnvironment = () => {
    dotenv.config();

<<<<<<< Updated upstream
    if (process.env.CLIENT_ID === undefined || process.env.CLIENT_SECRET === undefined) {
=======
    if (process.env.CLIENT_ID === undefined || process.env.CLIENT_SECRET === undefined || process.env.DB_URI === undefined) {
>>>>>>> Stashed changes
        console.log('Missing env values! Program will now exit');
        process.exit(0);
    }
    CLIENT_ID = process.env.CLIENT_ID;
    CLIENT_SECRET = process.env.CLIENT_SECRET;
<<<<<<< Updated upstream
=======
    DB_URI = process.env.DB_URI;
>>>>>>> Stashed changes

    initialised = true;
}

<<<<<<< Updated upstream
interface Token {
    "access_token": string,
    "expires_at": number,
}

let currentToken: Token | null = null;

const getInteractionToken = async (): Promise<String> => {

=======
let currentToken: Token | null = null;

const getBearerToken = async (): Promise<String> => {
>>>>>>> Stashed changes
    if (!initialised) {
        initialiseEnvironment();
    }

    const secondsSinceEpoch = Math.round(Date.now() / 1000);

    if (currentToken === null || currentToken.expires_at < secondsSinceEpoch) {
<<<<<<< Updated upstream
        //Current token does not exist or it has expired.
        //Now we need a new one
        try {
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

            let { access_token, expires_in } = response.data;

            currentToken = {
                "access_token": "69",
                "expires_at": (secondsSinceEpoch + expires_in)
            };

        } catch (error) {
            throw error;
        }
    }

    return currentToken.access_token;
};

export { initialiseEnvironment, getInteractionToken, PUBLIC_KEY, CLIENT_ID, CLIENT_SECRET }
=======
        currentToken = await getBearerToken();
    }

    return currentToken.access_token;

};

export { initialiseEnvironment, getBearerToken, PUBLIC_KEY, CLIENT_ID, CLIENT_SECRET, DB_URI }
>>>>>>> Stashed changes
