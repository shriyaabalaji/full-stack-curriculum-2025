// for backend code

const express = require('express')
require('dotenv').config()
const app = express()
const db = require('./firebase')

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World');
})
// Post route to add a new tweet
app.post('/api/tweets', async (req, res) => {
    const newTweet = {
        user: req.body.user,
        tweet: req.body.tweet
    };

    const tweetRef = await db.collection("tweets").add(newTweet);
    res.json({
        id: tweetRef.id,
        ...newTweet
    });
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))