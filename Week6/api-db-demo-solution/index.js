// Required setup commands:
// npm init --yes
// npm install express dotenv

// Ensure .gitignore includes .env and node_modules

const express = require('express');
require('dotenv').config();
const app = express();
const db = require('./firebase'); // Your Firebase config file

var pbkdf2 = require('pbkdf2')
const jwt = require('jsonwebtoken')
ACCESS_TOKEN_SECRET = "abc123"
const SALT = "aishdowiebfnownbf";

// Middleware to parse JSON
app.use(express.json());

// Middleware to validate tweet length
const validateTweetLength = (req, res, next) => {
    const tweet = req.body.tweet;
    if (tweet && tweet.length <= 100) {
        next();
    } else {
        res.status(400).json({ error: 'Tweet is too long (max 100 characters).' });
    }
};

// Middleware to validate input of post request
const validateInput = (req, res, next) => {
    const { user, tweet } = req.body;
    if (user && tweet) {
        next();
    } else {
        res.status(400).json({ error: 'Incomplete input' });
    }
};

// Root route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Get all tweets
app.get('/api/tweets', async (req, res) => {
    const tweetsSnapshot = await db.collection("tweets").get();
    const tweets = tweetsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    res.json(tweets);
});

// Get tweets by user
app.get('/api/tweets/:user', async (req, res) => {
    const { user } = req.params;
    const tweetsSnapshot = await db.collection("tweets").where("user", "==", user).get();
    if (tweetsSnapshot.empty) {
        res.status(404).json({ error: "No tweets found for this user" });
    } else {
        const tweets = tweetsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        res.json(tweets);
    }
});

// Post a new tweet
app.post('/api/tweets', validateInput, validateTweetLength, async (req, res) => {
    const newTweet = {
        user: req.body.user,
        tweet: req.body.tweet
    };
    console.log(
        "hi;"
    )
    const tweetRef = await db.collection("tweets").add(newTweet);
    res.json({ id: tweetRef.id, ...newTweet });
});

// Delete a tweet by its ID
app.delete('/api/tweets/:id', async (req, res) => {
    const { id } = req.params;
    const tweetRef = db.collection("tweets").doc(id);
    const tweetSnapshot = await tweetRef.get();

    if (!tweetSnapshot.exists) {
        res.status(404).json({ error: "Tweet not found" });
    } else {
        await tweetRef.delete();
        res.json({ id, ...tweetSnapshot.data() });
    }
});

const hashPassword = (password) => {
    const key = pbkdf2.pbkdf2Sync(password, SALT, 1000, 64, 'sha512');
    return key.toString('hex')
}

app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const passHashed = hashPassword(password);

    const check = await db.collection("users").where("username", "==", username).get();
    if (!check.empty) {
        return res.status(400).json({ msg: "User exists"});
    }

    const user = {
        username: username,
        password: passHashed,
    };

    const userRef = await db.collection("users").add(user);
    const accessToken = jwt.sign({ username: username}, ACCESS_TOKEN_SECRET, {
        expiresIn: "30s",
    });
    res.json({ data: {username: username }, token: accessToken });
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const passHashed = hashPassword(password);
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));