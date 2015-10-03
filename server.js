// use babel-node to run this file

import express from "express";

const app = express();

app.use(express.static(`${__dirname}/public`));

app.get("/api/related/:sentence", (request, response) => {
  response.send("Hello");
  console.log(request.params.imageURL);
});

app.get("/", (request, response) => {
  response.sendFile("index.html");
});

app.listen(8080, () => {
  console.log("Server has started up");
});
