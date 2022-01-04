const data = require("../../../data/latest.json");

export default function dataAPI(req, res) {
  
  const lang = req.query.locale || "en";
  const id = req.query.id;

  const foundItem = data.find((i) => (i.id == id));
  if (!foundItem) res.status(404);

  const item = {
    ...foundItem, 
    attributes: {
      ...foundItem.attributes,
      province: foundItem.attributes.province ? foundItem.attributes.province[`name_${lang}`] || foundItem.attributes.province.name_en : undefined,
      district: foundItem.attributes.district ? foundItem.attributes.district[`name_${lang}`] || foundItem.attributes.district.name_en : undefined,
      city: foundItem.attributes.city ? foundItem.attributes.city[`name_${lang}`] || foundItem.attributes.city.name_en : undefined
    }
  }

  let links = {
    self: req.url
  }

  res.status(200).json({
    data : item,
    links: links
  })
}
