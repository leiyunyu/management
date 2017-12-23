module.exports = (req,res) => {
    let address = require('../data/cityList.json');
    res.end(JSON.stringify(address))    
}