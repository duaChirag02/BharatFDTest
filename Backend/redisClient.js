import redis from "redis";

// Create and configure the Redis client
const redisClient = redis.createClient({
  host: "localhost", // or your Redis host
  port: 6379,        // default Redis port
});

redisClient.on("connect", function () {
  console.log("Connected to Redis...");
});

redisClient.on("error", function (err) {
  console.log("Redis error: " + err);
});

export default redisClient;
