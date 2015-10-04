// this file determines keywords of an image given its URL

import Clarifai from "./clarifai";
import apikeys from "../apikeys.json";
import request from "request";

const keywords = (imageURL, next) => {
  if (!next)
    return;

  Clarifai.initAPI(apikeys.clarifai.id, apikeys.clarifai.secret);
  const reimgurUrl = "http://45.79.188.233/api/?url=" + imageURL;
  request(reimgurUrl, (error, responseCode, imgurURL) => {
    Clarifai.tagURL(imgurURL, "sample image", (err, resp) => {
      if (err) {
        console.log(err);
        return;
      }

      const results = resp.results.map((image) => image.result);
      const getTags = (result) => result.tag.classes;
      next(results.map(getTags)[0]);
    });
  });
};

export default keywords;
