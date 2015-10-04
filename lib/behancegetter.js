// gets image URLs from behance

import request from "request";
import apikeys from "../apikeys";

const getImages = (pageNumber, next) => {
  if (!next)
    return;

  const url = `https://api.behance.net/v2/projects?&client_id=JufatqFBB8Q7HCb2WG2IydjVWCsxHh1q&page=${pageNumber}`;
  request(url, (error, responseCode, body) => {
    const projects = JSON.parse(body).projects;
    if (projects)
      next(projects);
  });
};

export default getImages;
