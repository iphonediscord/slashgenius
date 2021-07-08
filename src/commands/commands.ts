import { Request, Response } from 'express';

import { InteractionResponseType, InteractionType } from 'discord-interactions';
import { connect, disconnect } from '../database/database.js';
import { Tag } from '../database/tags.js';

const createDefaultCommands = () => {

}

const handleCommand = (interaction: any) => {

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
    }

    disconnect();

}

const createTag = (interaction: any) => {
    editInteractionResponse(interaction.token, {
        "type": 4,
        "data": {
            "tts": false,
            "content": "Successfully created sussy baka!"
        }
    })
}

const editTag = (interaction: any) => {

}

const deleteTag = (interaction: any) => {

}

export { handleCommand, createDefaultCommands }