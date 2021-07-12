import { Request, Response } from 'express';

import { InteractionResponseType, InteractionType } from 'discord-interactions';
import { connect, disconnect } from '../database/database.js';
import { ResponseAPI } from '../discord/ReponseAPI.js';
import { CommandParams, Interaction, WebhookMessageContent } from '../types/discord.types.js';
import { GuildCommandAPI } from '../discord/CommandAPI.js';
import defaults from './defaults.json';

const registerDefaultCommands = () => {
    let api = new GuildCommandAPI('409759972986191872');
    defaults.forEach((params) => {
        api.createCommand(params);
    })
}

const handleCommand = (interaction: Interaction) => {

    let { name } = interaction.data;

    connect();
    switch (name) {
        case 'create':
            createTag(interaction);
            break;
        case 'edit':
            editTag(interaction);
            break;
        case 'delete':
            deleteTag(interaction);
            break;
        case 'floppa':
            showFloppa(interaction);
            break;
        default:
            displayTag(interaction);
            break;
    }

    disconnect();

}

const createTag = (interaction: Interaction) => {
    let newContent: WebhookMessageContent = {
        content: 'Successfully created sussy baka!'
    }

    new ResponseAPI(interaction.token).editOriginalResponse(newContent);
}

const showFloppa = (interaction: Interaction) => {
    let newContent: WebhookMessageContent = {
        content: 'https://tenor.com/view/floppa-gif-22061121'
    }

    new ResponseAPI(interaction.token).editOriginalResponse(newContent);
}

const editTag = (interaction: Interaction) => {

}

const deleteTag = (interaction: Interaction) => {

}

const displayTag = (interaction: Interaction) => {

}

export { handleCommand, registerDefaultCommands }