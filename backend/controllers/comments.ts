import SpeechToTextV1 from "ibm-watson/speech-to-text/v1";
import NaturalLanguageUnderstandingV1 from "ibm-watson/natural-language-understanding/v1";
import LanguageTranslatorV3 from "ibm-watson/language-translator/v3";
import { IamAuthenticator } from "ibm-watson/auth";

import fs from "fs";
import path from "path";

import { apikey, serviceUrl } from "../constants/authorization";
import { addCommentToDatabase, getComments } from "./commentsCollection";

export const addComment = async (
  movieId: number,
  comment: string,
  userName: string
) => {
  speechToText(comment)
    .then((text) =>
      naturalLanguageUnderstanding(text)
        .then((permission) => {
          if (permission) {
            addCommentToDatabase(text, userName, movieId);
          } else {
            console.log("The comment is violent!");
          }
        })
        .catch((err) => console.error(err))
    )
    .catch((err) => console.error(err));
};

export const getMovieComments = async (movieId: number) => {
  return getComments(movieId).then((comments) => comments);
};

export const speechToText = async (fileName: string) => {
  const filePath = path.resolve(__dirname, "../voices", fileName);
  let ext = path.extname(filePath);
  let audioType = "";
  if (ext == ".flac") {
    audioType = "audio/flac";
  } else {
    audioType = "audio/mp3";
  }

  const speechToText = new SpeechToTextV1({
    authenticator: new IamAuthenticator({
      apikey: apikey.speachToText,
    }),
    serviceUrl: serviceUrl.speachToText,
  });
  const recognizeParams = {
    audio: fs.createReadStream(filePath),
    contentType: audioType,
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
  var languageModel = "";
  if (lan == "English") {
    languageModel = "en";
  } else if (lan == "French") {
    languageModel = "fr";
  } else {
    languageModel = "es";
  }

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
  var translatedComment = "";
  languageTranslator
    .translate(translateParams)
    .then((translationResult) => {
      translatedComment = translationResult.result.translations[0].translation;
      console.log(translatedComment);
    })
    .catch((err) => {
      console.log("error:", err);
    });

  return translatedComment;
};

export default {
  addComment,
  addCommentToDatabase,
  getMovieComments,
  speechToText,
  naturalLanguageUnderstanding,
  translation,
};
