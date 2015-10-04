// this file will continuously search through the behance frontpage and save the images and their keywords

import mongoose from "mongoose";
import Image from "../models/image";
import behance from "./behancegetter";
import getKeywords from "./keywords";

mongoose.connect("localhost");

mongoose.connection.on("error", () => {
  console.log("Could not connect to Mongoose");
});

let totalImagesGotten = 0;
let totalKeywordedImagesGotten = 0;
mongoose.connection.on("open", () => {
  for (let pageNumber = 0; pageNumber < 91; pageNumber++) {
    behance(pageNumber, (images) => {
      console.log(`On page number ${pageNumber}`);
      for (let image of images) {
        console.log(++totalImagesGotten, "images gotten");
        getKeywords(image.covers[404], (keywords) => {
          console.log(++totalKeywordedImagesGotten, "images with keywords");
          let entry = {
            behanceID: image.id,
            name: image.name,
            published: Date(image.published_on),
            created: Date(image.created_on),
            modified: Date(image.modified_on),
            url: image.url,
            categories: image.fields,
            stats: image.stats,
            keywords: keywords
          };

          Image.findOne({behanceID: image.id}, (error, images) => {
            console.log(images !== null);
            if (error)
              console.log(error);
            else if (images === []) { // if no images were found with that ID, add it
              console.log("The image is not in there");
              Image.create(entry, (err, newImage) => {
                if (err)
                  console.log(err);
                else
                  console.log(newImage);
              });
            }
          });
        });
      }
    });
  }
});
