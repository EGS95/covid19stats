module.exports = (req,res) => {
    const key = process.env.IP_INFO
    res.json({
        key:key
    })
}