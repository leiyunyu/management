let fs = require('fs');
module.exports = (req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
    console.log(req.body);
    let flag = '';
    let list = JSON.parse(fs.readFileSync('./data/user.json', 'utf-8'));
    list.forEach((v, i) => {
        if(v.name != req.body.name || v.tel != req.body.tel || v.id != req.body.id){
            flag = 'success'
        } else {
            flag = 'err';
        }
    })
    if(flag === 'success'){
        list.unshift(req.body);
        fs.writeFileSync('./data/user.json', JSON.stringify(list));
    }
    res.end(flag);
}