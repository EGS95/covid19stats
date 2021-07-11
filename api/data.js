const fetch = require("node-fetch");
const Ipinfo = require("node-ipinfo");
const ipinfo = new Ipinfo(process.env.IP_INFO);

const getHistoricalData = (data) => {
  let keys = Object.keys(data.timeline.cases);
  let cases = Object.values(data.timeline.cases);
  let deaths = Object.values(data.timeline.deaths);
  let recovered = Object.values(data.timeline.recovered);

  return keys.map((key, index) => {
    if (index !== 0)
      return {
        date: key,
        cases: cases[index],
        deaths: deaths[index],
        recovered: recovered[index],
        deltaCases: cases[index] - cases[index - 1],
        deltaDeaths: deaths[index] - deaths[index - 1],
        deltaRecovered: recovered[index] - recovered[index - 1],
      };
    else
      return {
        date: key,
        cases: cases[index],
        deaths: deaths[index],
        recovered: recovered[index],
        deltaCases: 0,
        deltaDeaths: 0,
        deltaRecovered: 0,
      };
  });
};

module.exports = async (req, res) => {
  if (!req.query.ccode) {
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
        fetch(
          "https://disease.sh/v3/covid-19/all?yesterday=false"
        ).then((res) => res.json()),
        fetch(
          "https://disease.sh/v3/covid-19/countries?yesterday=false"
        ).then((res) => res.json()),
        fetch(
          `https://disease.sh/v3/covid-19/historical/${reqCountry}?lastdays=all`
        ).then((res) => res.json()),
      ]);

      let worldData = {
        updated: data[0].updated,
        cases: data[0].cases,
        deaths: data[0].deaths,
        recovered: data[0].recovered,
        critical: data[0].critical,
      };

      let countryData = data[1].map((country) => {
        return {
          country: country.country,
          countryInfo: {
            iso2: country.countryInfo.iso2,
            lat: country.countryInfo.lat,
            long: country.countryInfo.long,
          },
          cases: country.cases,
          deaths: country.deaths,
          recovered: country.recovered,
          critical: country.critical,
          todayCases: country.todayCases,
          todayDeaths: country.todayDeaths,
          todayRecovered: country.todayRecovered,
        };
      });

      res.json({
        countryCode: reqCountry,
        worldData,
        countryData,
        historicalData: getHistoricalData(data[2]),
      });
    } catch (err) {
      res.json({ Error: err.message });
    }
  } else
    return fetch(
      `https://disease.sh/v3/covid-19/historical/${req.query.ccode}?lastdays=all`
    )
      .then((res) => res.json())
      .then((data) => {
        res.json({
          historicalData: getHistoricalData(data),
        });
      })
      .catch((err) => res.Error({message:err.message}));
};
