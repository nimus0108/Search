// this file determines keywords of an image given its URL

import Clarifai from "./clarifai";
import apikeys from "../apikeys.json";

const keywords = (imageURL, next) => {
  if (!next)
    return;

  Clarifai.initAPI(apikeys.clarifai.id, apikeys.clarifai.secret);
  Clarifai.tagURL(imageURL, "sample image", (err, resp) => {
    if (err) {
      console.log(err);
      return;
    }

    const results = resp.results.map((image) => image.result);
    const getTags = (result) => result.tag.classes;
    next(results.map(getTags));
  });
};

export default keywords;
