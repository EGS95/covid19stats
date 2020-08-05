const fetch = require('node-fetch')
const Ipinfo = require('node-ipinfo')
const ipinfo = new Ipinfo(process.env.IP_INFO)

module.exports = (req,res) => {
    const data = {
        remote:req.connection.remoteAddress,
        x:req.headers['x-forwarded-for']
    }
    res.send(data)
    
}