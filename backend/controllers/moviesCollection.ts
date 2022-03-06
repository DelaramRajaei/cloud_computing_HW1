import db from "../database/mongodb";

const collectionName = "movies";

export const getAll = async () => {
  return await db.collection(collectionName).find({}).toArray();
};

export const get = async (name: string) => {
  name = name.toLowerCase();
  return await db.collection(collectionName).find({ name: name }).toArray();
};
