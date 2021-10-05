import { slice, reduce } from "lodash";
const data = require("../../data/latest.json");

export default function dataAPI(req, res) {
  
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 100;
  const lang = req.query.locale || "en";
  const arrayOffset = offset * limit;

  // Set initial data.
  let filteredData = data;
  
  // Filter Age Range
  if (req.query.ageRange) {
    const ages = req.query.ageRange.split("-").map((age) => (parseInt(age)));
    filteredData = filteredData.filter((item) => {
      const itemAge = parseInt(item.attributes.ageValue);
      return itemAge >= ages[0] && itemAge <= ages[1];
    })
  }

  // Filter On Geo
  if (req.query.province) {
    filteredData = filteredData.filter((item) => {
      return item.attributes.province && item.attributes.province.id == req.query.province;
    })
  }
  if (req.query.district) {
    filteredData = filteredData.filter((item) => {
      return item.attributes.district && item.attributes.district.id == req.query.district;
    })
  }
  if (req.query.city) {
    filteredData = filteredData.filter((item) => {
      return item.attributes.city && item.attributes.city.id == req.query.city;
    })
  }

  // Filter On Gender
  if (req.query.gender) {
    filteredData = filteredData.filter((item) => {
      return item.attributes.gender == req.query.gender;
    })
  }

  console.log(`Received params ${reduce(req.query, (r,v,k) => (`${r} ${k}="${v}"`))}`)

  // Finally Paginate
  const slicedData = slice(filteredData, arrayOffset, arrayOffset + limit).map((i) => {
    return {
      ...i, 
      attributes: {
        ...i.attributes,
        province: i.attributes.province ? i.attributes.province[`name_${lang}`] || i.attributes.province.name_en : undefined,
        district: i.attributes.district ? i.attributes.district[`name_${lang}`] || i.attributes.district.name_en : undefined,
        city: i.attributes.city ? i.attributes.city[`name_${lang}`] || i.attributes.city.name_en : undefined
      }
    }
  });

  let links = {
    self: req.url
  }
  
  // Set Pagination Link if next offset contains data. 
  if (filteredData.length >= ((offset +1) * limit)) {
    links["next"] = `/api/entries?offset=${offset +1}&limit=${limit}`;
  }

  console.log(`Yielded ${slicedData.length} results for ${Object.keys(req.query).length} number of params`);
  res.status(200).json({
    data : slicedData,
    links: links
  })
}
