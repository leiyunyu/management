let fs = require('fs');
let jwt = require('jsonwebtoken');
module.exports = (req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
    let userlist = JSON.parse(fs.readFileSync('./data/user_list.json', 'utf-8')).list;
    let list = JSON.parse(fs.readFileSync('./data/user.json', 'utf-8'));
    let flag = ''
    jwt.verify(req.body.token, 'leiyun', (errs, decoded) => {
        // console.log(errs);
        if (errs) {
            // errs.code = 1001; //登录超时
            // res.end(JSON.stringify(errs));
            flag = 'jwt expired';
        } else {
            console.log(decoded)
            userlist.forEach((item, index) => {
                if(item.username == decoded.username){
                    if(item.authorization == 'master'){
                        list.forEach((v, i) => {
                            if (v.id === req.body.id) {
                                list.splice(i, 1);
                            }
                        });
                        fs.writeFileSync('./data/user.json', JSON.stringify(list));
                        flag = 'success';
                    }else{
                        flag = 'err'
                    }
                }
            })
        }
    })
    res.end(JSON.stringify(flag));
}