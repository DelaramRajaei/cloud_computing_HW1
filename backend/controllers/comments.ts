import SpeechToTextV1 from "ibm-watson/speech-to-text/v1";
import NaturalLanguageUnderstandingV1 from "ibm-watson/natural-language-understanding/v1";
import LanguageTranslatorV3 from "ibm-watson/language-translator/v3";
import { IamAuthenticator } from "ibm-watson/auth";

import fs, { stat } from "fs";
import path from "path";

import { apikey, serviceUrl } from "../constants/authorization";
import { addCommentToDatabase, getComments } from "./commentsCollection";

export const addComment = async (
  movieId: number,
  fileName: string,
  type: string,
  userName: string
) => {
  return speechToText(fileName, type).then(async (text) => {
    return await naturalLanguageUnderstanding(text)
      .then((permission) => {
        if (permission) {
          addCommentToDatabase(text, userName, movieId);
          // status = "Comment added successfuly!";
        } else {
          console.log("The comment is violent!");
          // status = "The comment is violent!";
        }
        return permission;
      })
      .catch((err) => console.error(err));
  });
};

export const getMovieComments = async (movieId: number, lang: string) => {
  return getComments(movieId).then(async (comments) => {
    let translatedCommentsPromises;

    translatedCommentsPromises = comments.map((comment: any) => {
      return translation(lang, comment.text).then((translatedComment) => ({
        ...comment,
        text: translatedComment,
      }));
    });

    return Promise.all(translatedCommentsPromises).then((comments) => comments);
  });
};

// export const getMovieComments = async (movieId: number, lang: string) => {
//   return getComments(movieId).then(async (comments) => {
//     let translatedCommentsPromises;
//     if (lang === "en") {
//       translatedCommentsPromises = comments;
//     } else {
//       translatedCommentsPromises = comments.map((comment: any) => {
//         return translation(lang, comment.text).then((translatedComment) => ({
//           ...comment,
//           text: translatedComment,
//         }));
//       });
//     }
//     return Promise.all(translatedCommentsPromises).then((comments) => comments);
//   });
// };

export const speechToText = async (fileName: string, type: string) => {
  const filePath = path.resolve(__dirname, "../uploads", fileName);

  const speechToText = new SpeechToTextV1({
    authenticator: new IamAuthenticator({
      apikey: apikey.speachToText,
    }),
    serviceUrl: serviceUrl.speachToText,
  });
  const recognizeParams = {
    audio: fs.createReadStream(filePath),
    contentType: type,
  };
  let text = "";
  await speechToText
    .recognize(recognizeParams)
    .then((speechRecognitionResults) => {
      text =
        speechRecognitionResults.result.results?.[0].alternatives?.[0]
          .transcript ?? "empty";
      console.log(text);
      return text;
    })
    .catch((err) => {
      console.log("error:", err);
    });
  return text;
};

export const naturalLanguageUnderstanding = async (comment: string) => {
  const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: "2021-08-01",
    authenticator: new IamAuthenticator({
      apikey: apikey.naturalLanguageUnderstanding,
    }),
    serviceUrl: serviceUrl.naturalLanguageUnderstanding,
  });

  const analyzeParams = {
    text: comment,
    features: {
      keywords: {
        sentiment: true,
      },
    },
  };
  return naturalLanguageUnderstanding
    .analyze(analyzeParams)
    .then((analysisResults) => {
      return (analysisResults.result.keywords?.[0].sentiment?.score ?? -1) >= 0;
    })
    .catch((err) => {
      console.log("error:", err);
      return false;
    });
};

export const translation = async (lan: string, comment: string) => {
  // let languageModel = "en-" + lan;
  let languageModel = lan;
  console.log(languageModel);

  console.log(languageModel);
  const languageTranslator = new LanguageTranslatorV3({
    version: "2018-05-01",
    authenticator: new IamAuthenticator({
      apikey: apikey.languageTranslator,
    }),
    serviceUrl: serviceUrl.languageTranslator,
  });

  const translateParams = {
    text: [comment, ""],
    target: languageModel,
  };
  return languageTranslator
    .translate(translateParams)
    .then((translationResult) => {
      return translationResult.result.translations[0].translation;
    })
    .catch((err) => {
      // console.log("error:", err);
      Promise.resolve("");
      return comment;
    });
};

export default {
  addComment,
  addCommentToDatabase,
  getMovieComments,
  speechToText,
  naturalLanguageUnderstanding,
  translation,
};
