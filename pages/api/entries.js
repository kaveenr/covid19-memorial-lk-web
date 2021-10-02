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
  if (req.query.province) {
    slicedData = slicedData.filter((item) => {
      return item.attributes.province && item.attributes.province.id == req.query.province;
    })
  }
  if (req.query.district) {
    slicedData = slicedData.filter((item) => {
      return item.attributes.district && item.attributes.district.id == req.query.district;
    })
  }
  if (req.query.city) {
    slicedData = slicedData.filter((item) => {
      return item.attributes.city && item.attributes.city.id == req.query.city;
    })
  }

  // Filter On Gender
  if (req.query.gender) {
    slicedData = slicedData.filter((item) => {
      return item.attributes.gender == req.query.gender;
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
