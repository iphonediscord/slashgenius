import express from 'express';

import { InteractionType, verifyKeyMiddleware } from 'discord-interactions';

import { PUBLIC_KEY } from './lib/authentication.js';

import { handleCommand } from './commands.js';

<<<<<<< Updated upstream
const app: express.Application = express();
const port = process.env.PORT || 6969;
=======
<<<<<<< Updated upstream
    const signature = req.get('X-Signature-Ed25519');
    const timestamp = req.get('X-Signature-Timestamp');

    const publickey: String | undefined = process.env.PUBLIC_KEY

    if (!publickey) {
        console.error('No public key provided')
        return res.status(500);
    }
>>>>>>> Stashed changes

app.post('/interactions', verifyKeyMiddleware(PUBLIC_KEY), (req: express.Request, res: express.Response) => {
    let interaction = req.body;

    if (interaction.type === InteractionType.APPLICATION_COMMAND) {
        handleCommand()
    }
<<<<<<< Updated upstream
}));
=======
=======
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
>>>>>>> Stashed changes
>>>>>>> Stashed changes

const initialiseServer = () => {
    app.listen(port, () => {
        console.log(`Listening on http://localhost:${port}`);
    })
}

export { initialiseServer };