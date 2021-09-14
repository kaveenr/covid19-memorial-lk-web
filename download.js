const requestOrg = require('request');
const util = require('util');
const fs = require('fs');
const request = util.promisify(requestOrg);

async function fetchData(){

  const rawData = await request({
    'method': 'GET',
    'url': 'https://raw.githubusercontent.com/kaveenr/covid19-memorial-lk-data/data/data/covid19_deaths_latest.json',
  }).catch((e)=> {
    throw Error("Unable to fetch vax centers");
  }).then((response) => (JSON.parse(response.body)));

  const data = rawData.map((i) => ({
    type: "entry",
    id: i.indexKey,
    attributes: i
  }));

  fs.writeFileSync("./data/latest.json", JSON.stringify(data, null, 4));
}

fetchData();