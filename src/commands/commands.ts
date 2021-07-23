import { ResponseAPI } from '../discord/ReponseAPI.js';
import { ApplicationCommand, CommandParams, CommandPermissions, GuildCommandPermissions, Interaction, WebhookMessageContent } from '../types/discord.types.js';
import { GuildCommandAPI } from '../discord/CommandAPI.js';
import { defaults } from './defaults.js';
import { Db, MongoClient } from 'mongodb';
import { getJSDocTags, transpileModule } from 'typescript';
import { nextTick } from 'process';

let managerRoles = ['411543613076406294', '663903105133576202'];
let rIphoneId = '409759972986191872'

if (process.env.DB_URI === undefined) {
    console.log('No DB URI env variable provided. Program will now exit.')
    process.exit(0);
}
const client = new MongoClient(process.env.DB_URI);

const registerCommands = async () => {

    //Add defaults to command list
    let commands: CommandParams[] = [];

    commands.push(...defaults);

    //Search for all tags and add them to the command list

    try {
        await client.connect();
        const database = client.db('genius');
        const tagsCollection = database.collection('tags');

        const tags = await tagsCollection.find().toArray();

        tags.forEach((tag) => {
            if (isValidTagName(tag.name)) {
                commands.push({
                        'name': tag.name,
                        'description': `Displays the ${tag.name} tag.`
                    });
            }
        });

    } finally {
        await client.close();
    }

    let api = new GuildCommandAPI(rIphoneId);

    let createdCommands: ApplicationCommand[] = await api.bulkOverwriteCommands(commands);

    let managerOnlyCommands: string[] = [];

    defaults.forEach((commandParam) => {
        if (commandParam.managerOnly) {
            managerOnlyCommands.push(commandParam.name);
        }
    })

    let managerOnlyPerms: CommandPermissions[] = [];

    managerRoles.forEach((roleId) => {
        managerOnlyPerms.push({
            'id': roleId,
            'type': 1,
            permission: true
        })
    })
    createdCommands.forEach(async (command) => {
        if (managerOnlyCommands.includes(command.name)) {
            api.editPermissions(command.id, managerOnlyPerms);
        }
    })
}

const handleCommand = (interaction: Interaction) => {

    let { name } = interaction.data;

    switch (name) {
        case 'create':
            createTag(interaction);
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
}

const createTag = async (interaction: Interaction) => {
    let response = 'sus';

    //interaction.data.options[0], [1]
    dbCreate: try {
        await client.connect();
        const database = client.db('genius');
        const tagsCollection = database.collection('tags');

        if (interaction.data.options === undefined) {
            throw new Error();
        }

        let tagName = interaction.data.options[0].value;

        if (tagName === undefined) {
            throw new Error();
        }

        if (!isValidTagName(tagName)) {
            response = 'Tag names must start with a lowercase letter and only contain up to 32 alphanumeric characters.'
            break dbCreate;
        }

        let error = false;

        defaults.forEach((param ) => {
            if (param.name === tagName) {
                response = 'That name is already registered to a default command.'
                error = true;
            }
        })

        if (error) {
            break dbCreate;
        }

        await tagsCollection.insertOne({
            name: tagName,
            content: interaction.data.options[1].value
        });

        new GuildCommandAPI(rIphoneId).createCommand({
            'name': tagName,
            'description': `Displays the ${tagName} tag.`
        })

        response = `Successfully created the \`${tagName}\` tag.`;
    } catch (error) {
        response = 'Error creating your tag. Please contact server staff.';
        console.log(error);
    } finally {
        await client.close();
    }


    new ResponseAPI(interaction.token).editOriginalResponse({content: response});
}

const showFloppa = async (interaction: Interaction) => {
    let newContent: WebhookMessageContent = {
        content: 'https://tenor.com/view/floppa-gif-22061121'
    }

    new ResponseAPI(interaction.token).editOriginalResponse(newContent);
}

const deleteTag = async (interaction: Interaction) => {
    if (interaction.data.options === undefined) {
        throw new Error();
    }

    let tagName = interaction.data.options[0].value;
    let response = 'Error deleting your tag. Please contact server staff.';
    dbDelete: try {

        await client.connect();

        const database = client.db('genius');
        const tagsCollection = database.collection('tags');

        let isDefaultCommand = false;

        defaults.forEach((param) => {
            if (param.name === tagName) {
                response = 'You cannot delete a default command.'
                isDefaultCommand = true;
            }
        });

        if (isDefaultCommand) {
            break dbDelete;
        }

        let tag = await tagsCollection.findOne({ name: tagName });

        if (tag === undefined) {
            response = `There is no tag named \`${tagName}\`.`;
            break dbDelete;
        }

        tagsCollection.deleteOne(tag);

        let cmdApi = new GuildCommandAPI(rIphoneId);

        let allCommands = await cmdApi.getAllCommands();

        allCommands.forEach((command) => {
            if (command.name === tagName) {
                cmdApi.deleteCommand(command.id);
            }
        });

        response = `Successfully deleted the\`${tagName}\` tag.`;

    } catch (error) {
        console.log(error);
    } finally {
        await client.close();
    }
    new ResponseAPI(interaction.token).editOriginalResponse({ content: response})
}

const updateCommands = async (interaction: Interaction) => {
    await registerCommands();

    new ResponseAPI(interaction.token).editOriginalResponse({content: 'Successfully updated all commands.'});
}

const displayTag = async (interaction: Interaction) => {
    let { name } = interaction.data;
    let content;

    try {
        await client.connect();
        const database = client.db('genius');
        const tagsCollection = database.collection('tags')

        let tag = await tagsCollection.findOne({ name: name });
        
        if (tag !== undefined) {
            content = tag.content;
        }
    } finally {
        await client.close();
    }

    let response = content || `There was an error displaying the \`${name}\` tag. Please contact server staff.`;

    new ResponseAPI(interaction.token).editOriginalResponse({ content: response });
}

const isValidTagName = (name: string): boolean => {
    var firstChar = name.charAt(0);


    if (firstChar !== firstChar.toUpperCase()) {
        if (/^[\w-]{1,32}$/.test(name)) {
            return true;
        }
    }
    return false;
}

export { handleCommand, registerCommands }