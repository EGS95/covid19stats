const fetch = require("node-fetch");
const Ipinfo = require("node-ipinfo");
const ipinfo = new Ipinfo(process.env.IP_INFO);

module.exports = async (req, res) => {
  const ip = req.headers["x-forwarded-for"];
  let reqCountry = "";
  try {
    let countryData = await ipinfo.lookupIp(ip);
    reqCountry = countryData._countryCode
    console.log(reqCountry)
  } catch {
    reqCountry = "";
  }


  try{
      let data = await Promise.all([
        fetch("https://disease.sh/v3/covid-19/all?yesterday=false").then(res => res.json()),
        fetch("https://disease.sh/v3/covid-19/countries?yesterday=false").then(res => res.json()),
      ]);

      res.json({
        countryCode: reqCountry,
        data,
      });
  }

  catch(err) {
      res.json({Error:err.message})
  }


};
