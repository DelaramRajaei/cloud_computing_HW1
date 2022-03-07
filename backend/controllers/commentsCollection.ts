import db from "../database/mongodb";

const collectionName = "comments";

export const addCommentToDatabase = async (
  comment: string,
  userName: string,
  movieId: number
) => {
  console.log(comment + userName + movieId)
  await db
    .collection(collectionName)
    .insertOne({ userName: userName, text: comment, movieID: movieId });
  console.log("The comment added succesfuly!");
};

export const getComments = async (movieId: number) => {
  // Filtered documents
  return await db
    .collection(collectionName)
    .find({ movieID: movieId.toString})
    .toArray();
};
