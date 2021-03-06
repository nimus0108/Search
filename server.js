require("babel/register");

// use babel-node to run this file

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import logarithmic from "logarithmic";
import Image from "./models/image";
import wordmap from "./lib/wordmap";
import areSimilar from "./lib/aresimilar";

mongoose.connect("localhost");

mongoose.connection.on("error", () => {
  logarithmic.error("Could not connect to Mongoose");
});

const app = express();

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser());

mongoose.connection.on("open", () => {
  logarithmic.ok("Connected to Mongoose correctly");

  Image.find({}, (err, images) => {
    console.log(`There are ${images.length} images stored in the database`);
  });

  app.get("/api/related/", (request, response) => {
    console.log(request);
    const keywords = request.query.keywords.split(",").map((word) => word.trim());
    Image.find({}, (error, images) => {
      const isNotInArray = (array) => {
        return (element) => array.indexOf(element) === -1;
      };
      let relatedImages = [];
      for (let image of images) {
        if (keywords.filter(isNotInArray(image.keywords)).length === 0) { // if all keywords are in the image
          relatedImages.push(image);
        }
      }
      response.send(relatedImages);
    });
  });
});

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

app.get('/stylesheets/styles.css', (request, response) => {
	response.sendFile(__dirname + "/stylesheets/styles.css");
});

app.get('/index-pics/:n', (request, response) => {
	response.sendFile(__dirname + "/index-pics/" + request.params.n);
});

app.listen(80, () => {
  logarithmic.ok("Server has started up");
});
