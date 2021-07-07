import { Request, Response } from 'express';

import { InteractionResponseType, InteractionType } from 'discord-interactions';
import { connect, disconnect } from '../database/database.js';
import { Tag } from '../database/tags.js';
import { createGuildCommand } from '../lib/http.js';

const createDefaultCommands = () => {
    createGuildCommand({
        "name": "create",
        "description": "Creates a tag",
        "options": [
            {
                "name": "name",
                "description": "Name of the tag",
                "type": "3",
                "required": true
            },
            {
                "name": "content",
                "description": "Content of the tag",
                "type": "3",
                "required": true
            }
        ]
    }, '409759972986191872', true);
}

const handleCommand = (interaction: any) => {

    let { name } = interaction.data;

    connect();
    switch (name) {
        case 'create':
            createTag(interaction);
            break;
        case 'update':
            updateTags(interaction);
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

}

const updateTags = (interaction: any) => {

}

const editTag = (interaction: any) => {

}

const deleteTag = (interaction: any) => {

}

export { handleCommand, createDefaultCommands }