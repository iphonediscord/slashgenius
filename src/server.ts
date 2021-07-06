import express from 'express';

import { InteractionResponseType, InteractionType, verifyKeyMiddleware } from 'discord-interactions';

import { PUBLIC_KEY } from './lib/environment.js';

const app: express.Application = express();
const port = process.env.PORT || 6969;


app.post('/interactions', verifyKeyMiddleware(PUBLIC_KEY), (req: express.Request, res: express.Response) => {

    const interaction = req.body;

    if (interaction.type === InteractionType.APPLICATION_COMMAND) {
        res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: 'yo yo yo willow smells',
            }
        })
    }
})

app.use(express.json());

app.get('/', (req: express.Request, res: express.Response) => {
    res.send("Hello World!").status(200);
    console.log('we got a get');
});


const initialiseServer = () => {
    app.listen(port, () => {
        console.log(`Listening on http://localhost:${port}`);
    })
}

export { initialiseServer };