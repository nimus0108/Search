// this file will continuously search through the behance frontpage and save the images and their keywords

import mongoose from "mongoose";
import logarithmic from "logarithmic";
import Image from "../models/image";
import behance from "./behancegetter";
import getKeywords from "./keywords";

mongoose.connect("localhost");

mongoose.connection.on("error", () => {
  console.log("Could not connect to Mongoose");
});

mongoose.connection.on("open", () => {
  for (let pageNumber = 0; pageNumber < 10; pageNumber++) {
    behance(pageNumber, (images) => {
      for (let image of images) {
        getKeywords(image.covers[404], (keywords) => {
          let entry = {
            behanceID: image.id,
            name: image.name,
            published: Date(image.published_on),
            created: Date(image.created_on),
            modified: Date(image.modified_on),
            url: image.url,
            categories: image.fields,
            stats: image.stats,
            keywords: keywords,
            thumbnail: image.covers[404]
          };
          Image.findOne({behanceID: image.id}, (error, images) => {
            if (error)
              console.log(error);

            // if no images were found with that ID, add it
            else if (!images) {
              console.log("The image is not in there");
              Image.create(entry, (err, newImage) => {
                console.log("Just saved the image");
                if (err)
                  logarithmic.warning(err);
                else
                  logarithmic.ok(newImage);
              });
            }
          });
        });
      }
    });
  }
});
