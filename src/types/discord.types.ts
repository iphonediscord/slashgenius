import { InteractionResponseType } from "discord-interactions"

export type Credentials = {
    access_token: string,
    expires_at: number
}

export type ApplicationCommand = {
    id: string,
    applicaiton_id: string,
    guild_id?: string,
    name: string,
    description: string,
    options?: CommandOption[],
    default_permission?: boolean
}

export type CommandOption = {
    type: number,
    name: string,
    description: string,
    required?: boolean,
    choices?: CommandOptionChoice[],
    options?: CommandOption[]
}

export type CommandOptionChoice = {
    name: string,
    value: string | number
}

export type CommandParams = {
    name: string,
    description: string,
    options?: CommandOption[],
    default_permission?: boolean
}

export type GuildCommandPermissions = {
    id: string,
    application_id: string,
    guild_id: string,
    permissions: string,
}

export type CommandPermissions = {
    id: string,
    type: 1|2,
    permission: boolean
}

export type CmdInteractionOption = {
    name: string,
    type: number,
    value?: string,
    options?: string
}

export type CommandInteractionData = {
    id: string,
    name: string,
    options?: CmdInteractionOption[],
}

export type Interaction = {
    id: string,
    application_id: string,
    type: InteractionResponseType,
    data: CommandInteractionData,
    guild_id?: string,
    channel_id?: string,
    token: string,
    version: 1
    //We can get the original message (Message) here if we need it in the future
}

//Only support content so far, can expand in future if need be
export type WebhookMessageContent = {
    content: string
}