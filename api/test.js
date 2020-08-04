module.exports = (req,res) => {
    const key = process.env.REACT_APP_API_KEY
    res.json({
        key:key
    })
}