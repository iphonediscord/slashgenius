import axios, { AxiosInstance } from "axios";
import { ApplicationCommand, CommandParams, CommandPermissions, Credentials, GuildCommandPermissions } from "../types";

import { URLSearchParams } from 'url';

let apiUrl = `https://discord.com/api/v8`

class CommandAPI {
    api: AxiosInstance
    static credentials: Credentials | null;


    constructor(endpoint: string) {
        //We can either have /applications/${process.env.APPLICATION_ID}/commands
        //OR
        //we can have /applications/${process.env.APPLICATION_ID}/guilds/${guildId}/commands
        this.api = axios.create({
            baseURL: `${apiUrl}/applications/${process.env.APPLICATION_ID}/${endpoint}`,
            timeout: 1000
        });

        this.api.interceptors.response.use(response => response, (error) => {
            console.log(error.response.data);
            console.log(error.response.status);
        })

        CommandAPI.credentials = null;

        this.api.interceptors.request.use(
            async (config) => {
                let secondsSinceEpoch: number = Math.round(Date.now() / 1000);
                if (CommandAPI.credentials == null || CommandAPI.credentials.expires_at > secondsSinceEpoch) {
                    CommandAPI.credentials = await getNewCredentials(secondsSinceEpoch);
                }

                config.headers = { 'Authorization': `Bearer ${CommandAPI.credentials.access_token}` }

                return config;
            }, (error) => {
                console.log('Error attaining bearer token.');
                console.log(error.request);
            }
        );
    }

    getAllCommands = async (): Promise<ApplicationCommand[]> => {
        let response = await this.api.get('');
        return response.data;
    }

    bulkOverwriteCommands = async (data: CommandParams[]): Promise<ApplicationCommand[]> => {
        let response = await this.api.put('', data);
        return response.data;
    }

    createCommand = async (params: CommandParams): Promise<ApplicationCommand> => {
        let response = await this.api.post('', params);
        return response.data;
    }

    getCommand = async (commandId: string): Promise<ApplicationCommand> => {
        let response = await this.api.get(`${commandId}`);
        return response.data;
    }

    editCommand = async (commandId: string, params: CommandParams): Promise<ApplicationCommand> => {
        let response = await this.api.patch(`${commandId}`, params);
        return response.data;
    }

    deleteCommand = async (commandId: string) => {
        await this.api.delete(`${commandId}`);
    }

}

const getNewCredentials = async (timestamp: number): Promise<Credentials> => {
    let params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('scope', 'applications.commands.update');

    if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET) {
        console.log('Missing CLIENT_ID or CLIENT_SECRET. Process will now exit.');
        process.exit(0);
    }

    let response = await axios.post(`${apiUrl}/oauth2/token`, params,
        {
            auth: {
                "username": process.env.CLIENT_ID,
                "password": process.env.CLIENT_SECRET
            }
        }
    );

    let { access_token, expires_in } = response.data;

    return { access_token: access_token, expires_at: timestamp + expires_in }
}

export class GuildCommandAPI extends CommandAPI {
    constructor(guildId: string) {
        super(`/guilds/${guildId}/commands`);
    }

    //Can add getAllPermissions - don't see a need for it though
    //Can also add batch edit permissions if we need to down the track

    getPermissions = async (commandId: string): Promise<GuildCommandPermissions[]> => {
        let response = await this.api.get(`${commandId}/permissions`);
        return response.data;
    }

    editPermissions = async (commandId: string, permissions: CommandPermissions[]): Promise<GuildCommandPermissions[]> => {
        let response = await this.api.put(`${commandId}/permissions`, { 'permissions': permissions });
        return response.data;
    }
}

export class GlobalCommandAPI extends CommandAPI {
    constructor() {
        super(`/commands`);
    }
}