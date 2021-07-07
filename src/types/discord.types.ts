import { InteractionResponseFlags, InteractionType } from "discord-interactions";

type InteractionResponse = {
    type: InteractionType,
    data?: InteractionCallbackData
}

type InteractionCallbackData = {
    tts?: boolean,
    content?: string,
    flags: InteractionResponseFlags
}

export { InteractionResponse }