import axios from 'axios'

import { initialiseEnvironment, CLIENT_ID, getInteractionToken } from './lib/authentication.js';
initialiseEnvironment();

import { initialiseServer } from './server.js'
initialiseServer();


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
    }

    let commandHeaders = {
        "Authorization": `Bearer ${await getToken()}`
    };

    try {
        let response = await axios({
            method: 'post',
            url: url,
            data: command,
            headers: commandHeaders
        })
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                console.log(`${error.response.status} :`, error.response.data);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log(`Axios error`, error.message);
            }
        } else {
            console.error(`(unexpected) ${error}`);
        }
    }
}

createTestCommand();
