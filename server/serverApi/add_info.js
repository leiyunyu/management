let fs = require('fs');
module.exports = (req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
    console.log(req.body.message);
    let list = JSON.parse(fs.readFileSync('./data/user.json', 'utf-8'));
    let id = req.body.id;
    let info = req.body.info;
    list.forEach((v, i) => {
        if (v.id === id) {
            v.info = info
        }
    });
    fs.writeFileSync('./data/user.json', JSON.stringify(list));
    res.end(JSON.stringify('success'));
}