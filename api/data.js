const fetch = require("node-fetch");
const Ipinfo = require("node-ipinfo");
const ipinfo = new Ipinfo(process.env.IP_INFO);

module.exports = async (req, res) => {

  console.log(req.body.params)

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

    let keys = Object.keys(data[2].timeline.cases)
        let cases = Object.values(data[2].timeline.cases)
        let deaths = Object.values(data[2].timeline.deaths)
        let recovered = Object.values(data[2].timeline.recovered)


        let historicalData =keys.map((key,index) => {
          return {
            date:key,
            cases:cases[index],
            deaths:deaths[index],
            recovered:recovered[index]
          }
        })

    res.json({
      countryCode: reqCountry,
      worldData: data[0],
      countryData: data[1],
      historicalData
    });
  } catch (err) {
    res.json({ Error: err.message });
  }
};
