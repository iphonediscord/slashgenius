import { config } from 'dotenv';

let PUBLIC_KEY: string;
let CLIENT_ID: string;
let CLIENT_SECRET: string;

const init = () => {
    config();

    console.log('initialising');

    PUBLIC_KEY === process.env.PUBLIC_KEY
    CLIENT_ID === process.env.CLIENT_ID
    CLIENT_SECRET === process.env.CLIENT_SECRET

    if (!PUBLIC_KEY || !CLIENT_ID || !CLIENT_SECRET) {
        console.log('Missing env values! Program will now exit');
        process.exit(0);
    }

}

export { init, PUBLIC_KEY, CLIENT_ID, CLIENT_SECRET }
