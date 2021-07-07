import { Request, Response } from 'express';

import { InteractionResponseType, InteractionType } from 'discord-interactions';

<<<<<<< Updated upstream
const handleCommand = (req: Request, res: Response) => {
    const interaction = req.body;

    if (interaction.type === InteractionType.APPLICATION_COMMAND) {
        res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: 'yo yo yo willow smells',
            }
        })
    }
=======
const handleCommand = (interaction: any) => {
    console.log(interaction);

    let data = {

    }

>>>>>>> Stashed changes
}

export { handleCommand }