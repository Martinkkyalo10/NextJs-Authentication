import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://nextauth2022:nextauth2022@cluster0.ntrwp.mongodb.net/nextauthDB?retryWrites=true&w=majority"
  );

  return client;
}
