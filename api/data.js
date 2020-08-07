const fetch = require("node-fetch");
const Ipinfo = require("node-ipinfo");
const ipinfo = new Ipinfo(process.env.IP_INFO);

module.exports = async (req, res) => {
  const ip = req.headers["x-forwarded-for"];
  let reqCountry = "";
  try {
    reqCountry = await ipinfo.lookupIp(ip)._countryCode;
  } catch {
    reqCountry = "";
  }


  try{
      let data = await Promise.all([
        fetch("https://disease.sh/v3/covid-19/all?yesterday=false"),
        fetch("https://disease.sh/v3/covid-19/countries?yesterday=false"),
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
