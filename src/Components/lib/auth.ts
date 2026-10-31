import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error("MONGODB_URL is missing in environment variables");
}

const client = new MongoClient(MONGODB_URL);
const db = client.db("doctors-tracker");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),


  emailAndPassword: {
    enabled: true,
  },



  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "admin",
        input: true,
      },
    },
  },
});