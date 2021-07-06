import dotenv from 'dotenv';
let PUBLIC_KEY = 'sixty nine';
let CLIENT_ID = '420';
let CLIENT_SECRET = 'dab';
const initialiseEnvironment = () => {
    dotenv.config();
    if (process.env.PUBLIC_KEY === undefined || process.env.CLIENT_ID === undefined || process.env.CLIENT_SECRET === undefined) {
        console.log('Missing env values! Program will now exit');
        process.exit(0);
    }
    PUBLIC_KEY = process.env.PUBLIC_KEY;
    CLIENT_ID = process.env.CLIENT_ID;
    CLIENT_SECRET = process.env.CLIENT_SECRET;
};
export { initialiseEnvironment, PUBLIC_KEY, CLIENT_ID, CLIENT_SECRET };
//# sourceMappingURL=environment.js.map