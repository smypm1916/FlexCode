const { createClient } = require("redis");

const redisClient = createClient({
   url: "redis://127.0.0.1:6379",
});

redisClient.on("error", (err) => console.error("Redis Client Error:", err));

module.exports = redisClient;
