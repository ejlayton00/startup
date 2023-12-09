const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

// Application specific
apiRouter.get('/loadsets', (_req, res) => {
    res.send(dicesets);
})

apiRouter.post('/saveset', (req, res) => {
    dicesets = updateDicesets(req.body, dicesets);
    res.send(dicesets);
})

let dicesets = [];
function updateDicesets(newDiceSet, dicesets) {
    dicesets.push(newDiceSet);
    if (dicesets.length > 10) {
        dicesets.length = 10;
    }
    return dicesets;
}