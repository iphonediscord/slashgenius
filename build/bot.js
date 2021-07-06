import axios from 'axios';
import querystring from 'querystring';
import { initialiseServer } from './server.js';
import { initialiseEnvironment, CLIENT_ID, CLIENT_SECRET } from './lib/environment.js';
initialiseEnvironment();
initialiseServer();
console.log("hello world");
const getToken = async () => {
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
        return response.data;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                console.log(`${error.response.status} :`, error.response.data);
            }
            else if (error.request) {
                console.log(error.request);
            }
            else {
                console.log(`Axios error`, error.message);
            }
        }
        else {
            console.error(`(unexpected) ${error}`);
        }
    }
    return null;
};
const createTestCommand = async () => {
    let url = `https://discord.com/api/v8/applications/${CLIENT_ID}/guilds/409759972986191872/commands`;
    let command = {
        "name": "test",
        "description": "Tests the slashGenius bot",
        "options": [
            {
                "name": "display_text",
                "description": "Text to display back",
                "type": 3,
                "required": false
            }
        ]
    };
    const credentials = await getToken();
    let commandHeaders = {
        "Authorization": `Bearer ${credentials?.access_token}`
    };
    try {
        let response = await axios({
            method: 'post',
            url: url,
            data: command,
            headers: commandHeaders
        });
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                console.log(`${error.response.status} :`, error.response.data);
            }
            else if (error.request) {
                console.log(error.request);
            }
            else {
                console.log(`Axios error`, error.message);
            }
        }
        else {
            console.error(`(unexpected) ${error}`);
        }
    }
};
createTestCommand();
