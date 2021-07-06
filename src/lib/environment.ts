import dotenv from 'dotenv';

let PUBLIC_KEY: string = "808e1ba34b0ba4940e8cb60a1fc945433a2d2b1f38ba747e7827bb02c09a23fc";
let CLIENT_ID: string;
let CLIENT_SECRET: string;

const initialiseEnvironment = () => {
    dotenv.config();

    if (process.env.CLIENT_ID === undefined || process.env.CLIENT_SECRET === undefined) {
        console.log('Missing env values! Program will now exit');
        process.exit(0);
    }
    CLIENT_ID = process.env.CLIENT_ID;
    CLIENT_SECRET = process.env.CLIENT_SECRET;

}

export { initialiseEnvironment, PUBLIC_KEY, CLIENT_ID, CLIENT_SECRET }
