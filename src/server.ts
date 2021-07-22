import express from 'express';

import { InteractionType, verifyKeyMiddleware } from 'discord-interactions';

import { handleCommand } from './commands/commands.js';

const app: express.Application = express();
const port = process.env.PORT || 6969;

if (process.env.PUBLIC_KEY === undefined) {
    console.log('Missing PUBLIC_KEY environment variable. Process will now exit.');
    process.exit(0);
}

app.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY), (req: express.Request, res: express.Response) => {
    let interaction = req.body;
    if (interaction.type === InteractionType.APPLICATION_COMMAND) {
        let response = {
            "type": 5,
            "data": {
                "tts": false,
            }
        }
        res.send(response).status(200);
        handleCommand(interaction);
    }
});

const initialiseServer = () => {
    app.listen(port, () => {
        console.log(`Listening on http://localhost:${port}`);
    })
}

export { initialiseServer };