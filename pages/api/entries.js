import { slice } from "lodash";
const data = require("../../data/latest.json");

export default function dataAPI(req, res) {
  
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 100;
  const arrayOffset = offset * limit;

  const slicedData = slice(data, arrayOffset, arrayOffset + limit)

  let links = {
    self: req.url
  }
  
  // Set Pagination Link if next offset contains data. 
  if (data.length >= ((offset +1) * limit)) {
    links["next"] = `/api/entries?offset=${offset +1}&limit=${limit}`;
  }

  res.status(200).json({
    data : slicedData,
    links: links
  })
}
