// this file determines keywords of an image given its URL

import Clarifai from "./clarifai";
import apikeys from "../apikeys.json";

export default (imageURL) => {
  Clarifai.initAPI(apikeys.clarifai.id, apikeys.clarifai.secret);
};
