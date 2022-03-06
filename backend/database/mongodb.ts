import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://DelaramRajaei:gXiz29Toz0qg@movies.zic1y.mongodb.net/movies?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const dbName = "movies-db";
export const initial = async () => {
  return client
    .connect()
    .then((conn) => {
      console.log("Successfully connected to database!");
      Promise.resolve();
    })
    .catch((err) => {
      console.error(err);
      console.error("Connection error!");
      Promise.reject();
    });
};

export default client.db(dbName);
