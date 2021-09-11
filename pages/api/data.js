import { slice } from "lodash";
const data = require("../../data/latest.json");

export default function dataAPI(req, res) {
  
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 20;
  const arrayOffset = offset * limit;

  const slicedData = slice(data, arrayOffset, arrayOffset + limit)
  res.status(200).json({
    data : slicedData.map((item) => ({
      type: "entry",
      id: item.indexKey,
      attributes: item
    })),
    links: {
      self: req.url,
      next: `/api/data?offset=${offset +1}&limit=${limit}`
    }
  })
}
