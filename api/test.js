const fetch = require('node-fetch')
const Ipinfo = require('node-ipinfo')
const ipinfo = new Ipinfo(process.env.IP_INFO)

module.exports = (req,res) => {
   
    const ip = req.headers['x-forwarded-for'];

    ipinfo.lookupIp(ip).then((response) => {
        res.send(response)
    });
    
}