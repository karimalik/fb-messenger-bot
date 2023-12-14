const express = require('express');
const bodyParser = require('body-parser');
const apiai = require('apiai');

const app = express();
const PORT = process.env.PORT || 4000;

const APIAI_ACCESS_TOKEN = ''

app.use(bodyParser.json());

//facebook webhook verification function
app.get('/webhook', (req, res) => {

    //verify token
    const VERIFY_TOKEN = 'textay_14852'

    //query params
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    //check if token and mode is in the very string of the request
    if (mode && token === VERIFY_TOKEN) {
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
});

//handling message
app.post('/webhook', (req, res) => {
    const body = req.body;

    if (body.object === 'page') {
        body.entry.forEach((entry) => {
            const webhookEvent = entry.messaging[0];
            console.log(webhookEvent);

            //write the handle message
        });

        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    }
});

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});