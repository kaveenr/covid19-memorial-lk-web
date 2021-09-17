const requestOrg = require('request');
const util = require('util');
const fs = require('fs');
const request = util.promisify(requestOrg);

async function fetchData(){

  const rawGeoData = await request({
    'method': 'GET',
    'url': 'https://raw.githubusercontent.com/kaveenr/covid19-memorial-lk-data/main/data/geo/geo.json',
  }).catch((e)=> {
    throw Error("Unable to fetch geo data");
  }).then((response) => (JSON.parse(response.body)));

  fs.writeFileSync("./data/geo_latest.json", JSON.stringify(rawGeoData, null, 4));

  const rawData = await request({
    'method': 'GET',
    'url': 'https://raw.githubusercontent.com/kaveenr/covid19-memorial-lk-data/data/data/covid19_deaths_latest.json',
  }).catch((e)=> {
    throw Error("Unable to fetch vax centers");
  }).then((response) => (JSON.parse(response.body)));

  const getCity = (key) => {
      if (!key) return null;
      const dbMatch = rawGeoData.cities.find((d) => (d.name_en === key));
      if (dbMatch) {
        return dbMatch;
      } else {
        console.warn(`City ${key} not in geo-dataset.`);
        return {name_en: key, name_si: key, name_ta: key};
      }
  }

  const data = rawData.map((i) => ({
    type: "entry",
    id: i.indexKey,
    attributes: {
      ...i,
      province: rawGeoData.provinces.find((d) => (d.name_en === i.province)),
      district: rawGeoData.districts.find((d) => (d.name_en === i.district)),
      city: getCity(i.city)
    }
  }));

  fs.writeFileSync("./data/latest.json", JSON.stringify(data, null, 4));

  const rawKeyData = await request({
    'method': 'GET',
    'url': 'https://raw.githubusercontent.com/kaveenr/covid19-memorial-lk-data/data/data/user_keys_latest.json',
  }).catch((e)=> {
    throw Error("Unable to fetch vax centers");
  }).then((response) => (JSON.parse(response.body)));

  fs.writeFileSync("./data/keys_latest.json", JSON.stringify(rawKeyData, null, 4));

}

fetchData();