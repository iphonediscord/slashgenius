import express from 'express';
import nacl from 'tweetnacl';
const app = express();
const port = 6969;
app.use(express.json());
app.get('/', (req, res) => {
    res.send("Hello World!").status(200);
    console.log('we got a get');
});
app.post('/', (req, res) => {
    console.log(req.body);
    const signature = req.get('X-Signature-Ed25519');
    const timestamp = req.get('X-Signature-Timestamp');
    const publickey = process.env.PUBLIC_KEY;
    if (!publickey) {
        console.error('No public key provided');
        return res.status(500);
    }
    let isVerified;
    if (signature && timestamp) {
        isVerified = nacl.sign.detached.verify(Buffer.from(timestamp + req.body), Buffer.from(signature, 'hex'), Buffer.from(publickey, 'hex'));
    }
    else {
        console.log('no signature or timestamp');
        isVerified = false;
    }
    if (!isVerified) {
        return res.send('Invalid request signature').status(401);
    }
    if (req.body['type'] == 1) {
        res.send({ 'type': 1 }).status(200);
        return;
    }
    res.send("");
});
const initialiseServer = () => {
    app.listen(port, () => {
        console.log(`Listening on http://localhost:${port}`);
    });
};
export { initialiseServer };
