import { slice } from "lodash";
const data = require("../../data/latest.json");

export default function dataAPI(req, res) {
  
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 50;
  const arrayOffset = offset * limit;

  // Set initial data.
  let slicedData = data;
  
  // Filter Age Range
  if (req.query.ageRange) {
    const ages = req.query.ageRange.split("-").map((age) => (parseInt(age)));
    slicedData = slicedData.filter((item) => {
      const itemAge = parseInt(item.attributes.ageValue);
      return itemAge >= ages[0] && itemAge <= ages[1];
    })
  }

  // Filter On Geo
  if (req.query.geoType) {
    slicedData = slicedData.filter((item) => {
      return item.attributes[req.query.geoType] && item.attributes[req.query.geoType].id == req.query.geoId;
    })
  }

  // Finally Paginate
  slicedData = slice(slicedData, arrayOffset, arrayOffset + limit)

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
