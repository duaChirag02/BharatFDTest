import redis from "ioredis"; // Using ioredis
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import faqRoutes from "./routes/faqRoutes.js";
import cors from "cors";
import session from "express-session";
import { EventEmitter } from "events";  // Import EventEmitter

const redisClient = new redis({
  host: "localhost", // Redis server host
  port: 6379,        // Redis server port
});

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

class RedisStore extends EventEmitter {
  constructor(redisClient) {
    super(); // Call the EventEmitter constructor
    this.redisClient = redisClient;
    this.redisClient.on("disconnect", () => {
      this.emit("disconnect"); // Emit the disconnect event
    });
  }

  async get(sid, callback) {
    try {
      const sessionData = await this.redisClient.get(sid);
      callback(null, sessionData ? JSON.parse(sessionData) : null);
    } catch (err) {
      callback(err);
    }
  }

  async set(sid, sessionData, callback) {
    try {
      await this.redisClient.set(sid, JSON.stringify(sessionData), "EX", 3600); // Expiry in seconds (1 hour)
      callback(null);
    } catch (err) {
      callback(err);
    }
  }

  async destroy(sid, callback) {
    try {
      await this.redisClient.del(sid);
      callback(null);
    } catch (err) {
      callback(err);
    }
  }
}

// Express app setup
const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// Session middleware with Redis store
app.use(
  session({
    store: new RedisStore(redisClient),
    secret: "Hello", // Secret key for session encryption
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true }, // `secure` should be true in production (with HTTPS)
  })
);

// MongoDB connection setup
mongoose
  .connect(
    "mongodb+srv://chiragdua02:syoDoZGw9rtBJ2wq@cluster0.myvfchz.mongodb.net/BharatFD",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api", faqRoutes);

// Test route to set session data
app.get("/set-session", (req, res) => {
  req.session.user = { name: "John Doe" }; // Storing user data in the session
  res.send("Session data set!");
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
