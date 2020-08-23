const fetch = require("node-fetch");
const Ipinfo = require("node-ipinfo");
const ipinfo = new Ipinfo(process.env.IP_INFO);

module.exports = async (req, res) => {
  if (req.query.ccode) {
   return fetch(
      `https://disease.sh/v3/covid-19/historical/${req.query.ccode}?lastdays=all`
    )
      .then((res) => res.json())
      .then((data) => {
        let keys = Object.keys(data.timeline.cases);
        let cases = Object.values(data.timeline.cases);
        let deaths = Object.values(data.timeline.deaths);
        let recovered = Object.values(data.timeline.recovered);

        let historicalData = keys.map((key, index) => {
          return {
            date: key,
            cases: cases[index],
            deaths: deaths[index],
            recovered: recovered[index],
          };
        });

        res.json({
          historicalData,
        });
      })
      .catch((err) => res.json({ Error: err.message }));
  }

  const ip = req.headers["x-forwarded-for"];
  let reqCountry = "";
  try {
    let countryData = await ipinfo.lookupIp(ip);
    reqCountry = countryData._countryCode;
  } catch {
    reqCountry = "US";
  }

  try {
    let data = await Promise.all([
      fetch("https://disease.sh/v3/covid-19/all?yesterday=false").then((res) =>
        res.json()
      ),
      fetch(
        "https://disease.sh/v3/covid-19/countries?yesterday=false"
      ).then((res) => res.json()),
      fetch(
        `https://disease.sh/v3/covid-19/historical/${reqCountry}?lastdays=all`
      ).then((res) => res.json()),
    ]);

    let keys = Object.keys(data[2].timeline.cases);
    let cases = Object.values(data[2].timeline.cases);
    let deaths = Object.values(data[2].timeline.deaths);
    let recovered = Object.values(data[2].timeline.recovered);

    let historicalData = keys.map((key, index) => {
      return {
        date: key,
        cases: cases[index],
        deaths: deaths[index],
        recovered: recovered[index],
      };
    });

    let worldData = {
      updated:data[0].updated,
      cases:data[0].cases,
      deaths:data[0].deaths,
      recovered:data[0].recovered,
      critical:data[0].critical,
    }

    let countryData = data[1].map(country => {
      return {
        country:data[1].country,
        countryInfo:{
          iso2:data[1].countryInfo.iso2,
          lat:data[1].countryInfo.lat,
          long:data[1].countryInfo.long,
        },
        cases:data[1].cases,
        deaths:data[1].deaths,
        recovered:data[1].recovered,
        critical:data[1].critical,
        todayCases:data[1].todayCases,
        todayDeaths:data[1].todayDeaths,
        todayRecovered:data[1].todayRecovered,

      }
    })

    res.json({
      countryCode: reqCountry,
      worldData,
      countryData,
      historicalData,
    });
  } catch (err) {
    res.json({ Error: err.message });
  }
};
