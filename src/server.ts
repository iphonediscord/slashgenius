import express from 'express';

import { InteractionType, verifyKeyMiddleware } from 'discord-interactions';

import { PUBLIC_KEY } from './lib/authentication.js';

import { handleCommand } from './commands.js';

const app: express.Application = express();
const port = process.env.PORT || 6969;

app.post('/interactions', verifyKeyMiddleware(PUBLIC_KEY), (req: express.Request, res: express.Response) => {
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