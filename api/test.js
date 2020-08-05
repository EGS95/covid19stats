const fetch = require('node-fetch')
const Ipinfo = require('node-ipinfo')
const ipinfo = new Ipinfo(process.env.IP_INFO)

module.exports = (req,res) => {
    res.send(req)
    
}