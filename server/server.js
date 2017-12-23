let express = require('express');
let jwt = require('jsonwebtoken');
let body = require('body-parser');
let multer = require('multer');
let fs = require('fs');
let app = express();
app.use(body.json());
app.use(express.static("./"));
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})
// 登录
let login = '/admin/loginUser';
// 注册
let register = '/admin/registerUser';
// 跳转路由
let publics = '/admin/menu/:name';
// 用户信息
let user = '/admin/user';
// 上传图片
let loadpic = '/admin/upload';
// 添加活动
let add_act= '/admin/activity/add';
let add_act_callback = require('./serverApi/active_add.js');
app.post(add_act, add_act_callback)
// 请求地址
let address = require('./serverApi/location.js');
app.get('/admin/community/location/root', address);
// 分页
let pagesize = require('./serverApi/add_user.js');
app.post('/admin/user', pagesize);
// 删除用户
let delUser = require('./serverApi/del_user.js');
app.post('/admin/deluser', delUser);
// 添加备注
let addBeizhu = require('./serverApi/add_info.js');
app.post('/admin/info', addBeizhu)
// 报名
let gotoVi = require('./serverApi/gotoVi');
app.post('/admin/goto', gotoVi)
// let storage = multer.diskStorage({
//     destination: './uploads',
//     filename: function (req, file, cb) {
//         console.log(file.fieldname);
//         cb(null, file.fieldname + '-' + file.originalname)
//     }
// })
// let uploader = multer({ storage: storage })
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, file.fieldname + '-' + file.originalname);
    }
});
let uploads = multer({storage: storage});
// app.post(loadpic, uploader.single('avatar'),(req, res) => {
//     console.log(req.file);
//     if (req.file) {
//         res.end(JSON.stringify(req.file));
//     }
//     res.end('error');
// })
app.post( loadpic, uploads.single('file'), function (req, res) {
    res.end(JSON.stringify(1));
});
app.post(login, (req, res) => {
    console.log(req.body);
    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
    let user_list = JSON.parse(fs.readFileSync('./data/user_list.json', 'utf-8'));
    let token, response, flag = false;
    user_list.list.forEach((item) => {
        if(item.username == req.body.username){
            flag = true;
            if(item.password == req.body.password) {
                token = jwt.sign(req.body, 'leiyun', {expiresIn: 30*30});
                response = {
                    "code": 1,
                    "token": token,
                    "msg": "SUCCESS"
                };
            }else{
                response = {
                    "code": 2,
                    "error": 'error',
                    "msg": "密码错误"
                }
            }  
        }
    });
    if(!flag){
        response = {
            "code": 3,
            "error": 'error',
            "msg": "此用户不存在"
        }
    }
    res.end(JSON.stringify(response));
});
app.post(register, (req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
    let user_list = fs.readFileSync('./data/user_list.json', {encoding: 'utf-8'});
    console.log(user_list);
    user_list = JSON.parse(user_list);
    user_list.list.push(req.body);
    fs.writeFileSync('./user_list.json', JSON.stringify(user_list));
    let obj = {
        "code": 1,
        "msg": "SUCCESS"
    }
    console.log(req.body);
    res.end(JSON.stringify(obj));
})
app.all(publics, (req, res) => {
    console.log(req.params);
    let data = null;
    switch (req.params.name) {
        case 'public': data = fs.readFileSync('../mock/public.json', 'utf-8');
        break;
        case 'entry': data = fs.readFileSync('../mock/entry.json', 'utf-8');
        break;
        case 'grid': data = fs.readFileSync('../mock/grid.json', 'utf-8');
        break;
    }
    res.end(data);
});
app.post(user, (req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
    let user = fs.readFileSync('./data/user.json', {encoding: 'utf-8'});
    user = JSON.parse(user);
    fs.writeFileSync('./user.json', JSON.stringify(user));
    res.end(JSON.stringify(user));
})
app.listen(3333, () => {
    console.log('listen... 3333');
})