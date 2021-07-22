import { connect, disconnect } from '../database/database.js';
import { ResponseAPI } from '../discord/ReponseAPI.js';
import { CommandParams, CommandPermissions, GuildCommandPermissions, Interaction, WebhookMessageContent } from '../types/discord.types.js';
import { GuildCommandAPI } from '../discord/CommandAPI.js';
import defaults from './defaults.json';
import mongoose from 'mongoose';
import { Tag } from '../database/tags.js';
import { TagDocument } from '../types/database.types.js';

let managerRoles = ['411543613076406294', '663903105133576202'];
let rIphoneId = '409759972986191872'

const registerDefaultCommands = () => {
    let api = new GuildCommandAPI(rIphoneId);
    defaults.forEach(async (params) => {
        try {
            let command = await api.createCommand(params);
            if (params.managerOnly) {
                let permissions: CommandPermissions[] = [];
                
                managerRoles.forEach((roleId) => {
                    permissions.push({
                        'id': roleId,
                        'type': 1,
                        permission: true
                    })
                });

                api.editPermissions(command.id, permissions)
            }
        } catch (error) {
            console.log(`Error creating '${params.name}' command`, error);
        }
    })
}

const handleCommand = (interaction: Interaction) => {

    let { name } = interaction.data;

    try {
        connect();
    } catch (error) {
        console.log(`Error connecting to DB`, error);
    }
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
        case 'update':
            updateCommands(interaction);
            break;
        default:
            displayTag(interaction);
            break;
    }

    disconnect();

}

const createTag = async (interaction: Interaction) => {
    let newContent: WebhookMessageContent = {
        content: 'Successfully created sussy baka!'
    }

    new ResponseAPI(interaction.token).editOriginalResponse(newContent);
}

const showFloppa = async (interaction: Interaction) => {
    let newContent: WebhookMessageContent = {
        content: 'https://tenor.com/view/floppa-gif-22061121'
    }

    new ResponseAPI(interaction.token).editOriginalResponse(newContent);
}

const editTag = async (interaction: Interaction) => {

}

const deleteTag = async (interaction: Interaction) => {

}

const updateCommands = async (interaction: Interaction) => {
    const allTags = await Tag.find();

    let commands: CommandParams[] = [];

    allTags.forEach((tag: TagDocument) => {
        commands.push({
            'name': tag.name,
            'description': `Displays the '${tag.name}' tag.`
        });
    });

    new GuildCommandAPI(rIphoneId).bulkOverwriteCommands(commands)
}

const displayTag = async (interaction: Interaction) => {
    let { name } = interaction.data;

    //Lookup name in db and display it
    Tag.findOne({ 'name': name }, 'name content', {}, (err, tag) => {
        let api = new ResponseAPI(interaction.token);
        if (err || tag === null || tag.content === null) {
            api.editOriginalResponse({ content: `There was an error displaying the \`${name}\` tag. Please notify server staff.` });
        } else {
            api.editOriginalResponse({ content: tag.content });
        }
    })
}

export { handleCommand, registerDefaultCommands }