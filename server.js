const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 5050;
const MONGO_URL = process.env.MONGO_URL || "mongodb://admin:qwerty@localhost:27017";

// const MONGO_URL = "mongodb://admin:qwerty@localhost:27017";


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

let db;

// Connect once at startup
async function connectToDB() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("✅ Connected to MongoDB");
  db = client.db("apnacollege-db");
}

app.get("/getUsers", async (req, res) => {
  try {
    const data = await db.collection("users").find({}).toArray();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching users");
  }
});

app.post("/addUser", async (req, res) => {
  try {
    const user = req.body;
    await db.collection("users").insertOne(user);
    res.send("User added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding user");
  }
});

app.listen(PORT, async () => {
  await connectToDB();
  console.log(`🚀 Server running on port ${PORT}`);
});
