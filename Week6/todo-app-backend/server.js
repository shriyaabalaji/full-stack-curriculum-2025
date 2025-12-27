// Importing required modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const admin = require("firebase-admin")

// Creating an instance of Express
const app = express();

// Loading environment variables from a .env file into process.env
require("dotenv").config();

// Importing the Firestore database instance from firebase.js
const db = require("./firebase");


// Middlewares to handle cross-origin requests and to parse the body of incoming requests to JSON
app.use(cors());
app.use(bodyParser.json());

// Firebase Admin Authentication Middleware
const auth = (req, res, next) => {
  try {
    const tokenId = req.get("Authorization").split("Bearer ")[1];
    admin.auth().verifyIdToken(tokenId)
      .then((decoded) => {
        req.token = decoded;
        next();
      })
      .catch((error) => res.status(401).send(error));
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

// Your API routes will go here...

app.get("/", async (req, res) => {
  try {
    const collections = await db.listCollections();
    res.status(200).send({
      message: "Todo API is running!",
      database: "Connected",
      collections: collections.map(col => col.id)
    });
  } catch (error) {
    res.status(500).send({
      message: "API running but database error",
      error: error.message
    });
  }
});

// GET: Endpoint to retrieve all tasks
app.get("/tasks", async (req, res) => {
  try {
    // Fetching all documents from the "tasks" collection in Firestore
    const snapshot = await db.collection("tasks").get();
    
    let tasks = [];
    // Looping through each document and collecting data
    snapshot.forEach((doc) => {
      tasks.push({
        id: doc.id,  // Document ID from Firestore
        ...doc.data(),  // Document data
      });
    });
    
    // Sending a successful response with the tasks data
    res.status(200).send(tasks);
  } catch (error) {
    // Sending an error response in case of an exception
    res.status(500).send(error.message);
  }
});

// GET: Endpoint to retrieve all tasks for a user
app.get("/tasks/:user", async (req, res) => {
  try {
    const { user } = req.params;
    const snapshot = await db.collection("tasks").where("user", "==", user).get();
    
    let tasks = [];

    // Looping through each document and collecting data
    snapshot.forEach((doc) => {
      tasks.push({
        id: doc.id,  // Document ID from Firestore
        ...doc.data(),  // Document data
      });
    });
    
    // Always return an array, even if empty
    res.status(200).send(tasks);
  } catch (error) {
    // Sending an error response in case of an exception
    res.status(500).send(error.message);
  }
});

// POST: Endpoint to add a new task
app.post('/tasks', auth, async (req, res) => {
    const data = {
        user: req.token.uid,
        name: req.body.name,
        finished: false
    };
    const addedTask = await db.collection("tasks").add(data);
    res.status(201).send({
      id: addedTask.id,  // Automatically generated Document ID from Firestore
      ...data,
    });
});


// DELETE: Endpoint to remove a task
app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const taskRef = db.collection("tasks").doc(id);
    const snapshot = await taskRef.get();

    if (!snapshot.exists) {
        res.status(404).json({ error: "Task not found" });
    } else {
        await taskRef.delete();
        res.json({ id, ...snapshot.data() });
    }
});

// Setting the port for the server to listen on
const PORT = process.env.PORT || 3001;
// Starting the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});