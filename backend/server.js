const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const seedDatabase = require("./seed");

const artRoutes = require("./routes/artRoutes");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use("/api/arts", artRoutes);

app.use(express.static(path.join(__dirname, "public")));

// testing route to check if the server is running
app.get("/", (req, res) => {
  res.send("Art API is running");
});

// Start in-memory Mongo server
const startServer = async () => {
  try {
    const mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri);
    console.log("Connected to in-memory MongoDB");

    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(
      "Failed to start MongoMemoryServer or connect Mongoose",
      err
    );
  }
};

startServer();
