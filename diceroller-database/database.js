const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('diceroller');
const diceCollection = db.collection('dice');

(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
})().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
});

async function addDiceset(diceset) {
    const result = await diceCollection.insertOne(diceset);
    return result;
}

function getDicesets() {
    const dicesets = diceCollection
        .find({})
        .sort({ dateSaved: -1 })
        .limit(6)
        .toArray();
    return dicesets;
}

module.exports = { addDiceset, getDicesets };

console.log("Before tests");
addDiceset({ "name": "test" });
console.log("Between tests");
const result = getDicesets()
console.log(result);
console.log("after tests");
