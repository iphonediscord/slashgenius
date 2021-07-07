import { Request, Response } from 'express';

import { InteractionResponseType, InteractionType } from 'discord-interactions';
import { connect, disconnect } from '../database/database.js';
import { Tag } from '../database/tags.js';
import { createGuildCommand, editInteractionResponse } from '../lib/http.js';

const createDefaultCommands = () => {
    createGuildCommand({
        "name": "create",
        "description": "Creates a tag",
        "options": [
            {
                "name": "name",
                "description": "Name of the tag",
                "type": 3,
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

    createGuildCommand({
        "name": "edit",
        "description": "Edits a tag",
        "options": [
            {
                "name": "name",
                "description": "Name of the tag",
                "type": 3,
                "required": true
            },
            {
                "name": "new-content",
                "description": "New content of the tag",
                "type": "3",
                "required": true
            }
        ]
    }, '409759972986191872', true);

    createGuildCommand({
        "name": "delete",
        "description": "Deletes a tag",
        "options": [
            {
                "name": "name",
                "description": "Name of the tag",
                "type": 3,
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
        case 'edit':
            editTag(interaction);
            break;
        case 'delete':
            deleteTag(interaction);
            break;
        default:
            displayTag(interaction);
            break;
    }

    disconnect();

}

const createTag = (interaction: any) => {
    editInteractionResponse(interaction.token, {
        "content": "Successfully created a new tag!"
    })
}

const editTag = (interaction: any) => {
    editInteractionResponse(interaction.token, {
        "content": `Successfully edited tag!`
    })
}

const deleteTag = (interaction: any) => {
    editInteractionResponse(interaction.token, {
        "content": `Successfully deleted tag!`
    })
}

const displayTag = (interaction: any) => {
    editInteractionResponse(interaction.token, {
        "content": `Successfully edited tag!`
    })
}

export { handleCommand, createDefaultCommands }