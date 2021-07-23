import axios, { AxiosInstance } from "axios";

import { WebhookMessageContent } from '../types';

let apiUrl = `https://discord.com/api/v8`

export class ResponseAPI {
    api: AxiosInstance
    constructor(token: string) {
        this.api = axios.create({
            baseURL: `${apiUrl}/webhooks/${process.env.APPLICATION_ID}/${token}/messages/@original`,
            timeout: 1000
        });

        this.api.interceptors.response.use(response => response, (error) => {
            console.log(error.response.data);
            console.log(error.response.status);
        });
    }

    getOriginalResponse = async () => {
        let response = await this.api.get('');
        return response.data;
    }

    editOriginalResponse = async (content: WebhookMessageContent) => {
        let response = await this.api.patch('', content);
        return response.data;
    }

    deleteOriginalResponse = async () => {
        await this.api.delete('');
    }
}