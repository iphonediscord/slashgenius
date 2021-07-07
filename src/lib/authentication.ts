import dotenv from 'dotenv';

import axios from 'axios';
import querystring from 'querystring';

import { getTokenResponse } from './http.js';

import { Token } from '../types';

let PUBLIC_KEY: string = "808e1ba34b0ba4940e8cb60a1fc945433a2d2b1f38ba747e7827bb02c09a23fc";
let CLIENT_ID: string;
let CLIENT_SECRET: string;
let DB_URI: string;

let initialised: boolean;

const initialiseEnvironment = () => {
    dotenv.config();

    if (process.env.CLIENT_ID === undefined || process.env.CLIENT_SECRET === undefined || process.env.DB_URI === undefined) {
        console.log('Missing env values! Program will now exit');
        process.exit(0);
    }
    CLIENT_ID = process.env.CLIENT_ID;
    CLIENT_SECRET = process.env.CLIENT_SECRET;
    DB_URI = process.env.DB_URI;

    initialised = true;
}

let currentToken: Token | null = null;

const getBearerToken = async (): Promise<string> => {
    if (!initialised) {
        initialiseEnvironment();
    }

    const secondsSinceEpoch = Math.round(Date.now() / 1000);

    if (currentToken === null || currentToken.expires_at < secondsSinceEpoch) {
        currentToken = await getTokenResponse();
    }

    return currentToken.access_token;

};

export { initialiseEnvironment, getBearerToken, PUBLIC_KEY, CLIENT_ID, CLIENT_SECRET, DB_URI }
