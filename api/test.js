const fetch = require('node-fetch')

module.exports = (req,res) => {
    fetch(`https://ipinfo.io/?token=${process.env.IP_INFO}`)
    .then((res) => res.json())
    .then((data) => {
     
      res.json(data)
    });
}