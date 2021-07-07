import axios from 'axios'
import querystring from 'querystring';
import { InteractionResponse, Token } from '../types';

import { CLIENT_ID, CLIENT_SECRET, APP_ID, getBearerToken } from './authentication.js';

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

const editInteractionResponse = async (token: string, interactionResponse: InteractionResponse) => {
    await axios(`https://discord.com/api/v8/webooks/${APP_ID}/${token}/messages/@original`, {
        method: 'PATCH',
        data: interactionResponse
    });
}

const createGlobalCommand = async (commandData: any) => {
    let response = await axios(`https://discord.com/api/v8/applications/${APP_ID}/commands`, {
        method: 'POST',
        data: commandData,
        headers: {
            "Authorization": `Bearer ${await getBearerToken()}`
        }
    })
}

const tagManagers = ['663903105133576202', '411543613076406294'];

const createGuildCommand = async (commandData: any, guildId: string, tagManagerOnly: boolean) => {
    if (tagManagerOnly) {
        commandData.default_permission = false;
    }

    let response = await axios(`https://discord.com/api/v8/applications/${APP_ID}/guilds/${guildId}/commands`, {
        method: 'POST',
        data: commandData,
        headers: {
            "Authorization": `Bearer ${await getBearerToken()}`
        }
    })

    if (tagManagerOnly) {
        let { commandId } = response.data;
        let permissions: any[] = [];
        tagManagers.forEach((roleId) => {
            permissions.push({
                'id': roleId,
                'type': 1,
                'permission': true
            })
        })

        try {
            await axios(`https://discord.com/api/v8/applications/${APP_ID}/guilds/${guildId}/commands/${commandId}/permissions`, {
                method: 'PUT',
                data: {
                    "permissions": permissions
                },
                headers: {
                    "Authorization": `Bearer ${await getBearerToken()}`
                }
            })
        } catch (error) {
            console.error(error);
        }
    }
}

export { getTokenResponse, editInteractionResponse, createGlobalCommand, createGuildCommand }