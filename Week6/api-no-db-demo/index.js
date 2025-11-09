// install
const express = require("express");
const app = express();

// import env variables
require("dotenv").config();

app.use(express.json());

// fake database
const tweets = [
    { id: 1, user: "Ryan", tweet: "ChatGPT" },
    { id: 2, user: "Mohammad", tweet: "Hello World!" },
];

// middleware
const validateInput = (req, res, next) => {
    if (!req.body.user || !req.body.tweet) {
        return res.status(400).json({error: "incomplete input"});
    } else {
        next();
    }
};

// get tweet by user
app.get("/api/tweets/:user", (req, res) => {
    let target = tweets.find((t) => t.user == req.params.user);
    if (!target) {
        res.status(404).send("User not found");
    } else {
        res.send(target);
    }
});

// post a tweet
app.post("/api/tweets", (req, res) => {
    let previous_tweet = tweets[tweets.length - 1]
    let tweet = {
        id: previous_tweet.id + 1,
        user: req.body.user,
        tweet: req.body.tweet
    }
    tweets.push(tweet);
    res.send(tweet);
});

// delete a tweet
app.delete("/api/tweets", validateInput, (req, res) => {
    let tweetIndex = tweets.findIndex((tweet) => tweet.id == req.body.id);
    if (tweetIndex === -1) {
        res.status(404).send("Tweet not found");
    } else {
        // remove tweet
        let removed = tweets[tweetIndex];
        console.log(removed);
        tweets.splice(tweets.indexOf, 1);
        res.json(removed);
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));