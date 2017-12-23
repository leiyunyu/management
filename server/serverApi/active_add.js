let fs = require('fs');
module.exports = (req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
    console.log(req.body);
    let act = fs.readFileSync('./data/active_list.json', {encoding: 'utf-8'});
    act = JSON.parse(act)
    act.list.push(req.body);
    fs.writeFileSync('./data/active_list.json', JSON.stringify(act));
    res.end(JSON.stringify('success'));
}