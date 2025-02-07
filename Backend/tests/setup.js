import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = "mongodb+srv://chiragdua02:syoDoZGw9rtBJ2wq@cluster0.myvfchz.mongodb.net/BharatFDtest" || mongoServer.getUri(); // Use your real URI in .env

//   await mongoose.connect(mongoUri, {
//     dbName: "BharatFDtest",
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
}
);

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});
