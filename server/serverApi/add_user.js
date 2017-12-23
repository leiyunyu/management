let fs = require('fs');
module.exports = (req, res) => {
    console.log(req.body);
    let {count, pageSize} = req.body;
    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
    var list = JSON.parse(fs.readFileSync('./data/user.json', 'utf-8'));
    var clist = list.slice(count * (pageSize - 1), count * pageSize);
    res.end(JSON.stringify(clist));
}