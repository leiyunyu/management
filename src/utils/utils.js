function getCookie(target) {
    let value;
    document.cookie.split('; ').forEach((item, index) => {
        let keys = item.split('=');
        if(keys[0] == target) {
            value = keys[1]
        }
    })
    return value
}
function setCookie(a, b) {
    if(!a || !b) return;
    document.cookie = a + '=' + b;  
}
function delCookie(name) {
    let exp = new Date();
    exp.setTime(exp.getTime() -1);
    let cval = getCookie(name);
    if(cval!=null){
        document.cookie = name + '=' +cval + ';expires' + exp.toGMTString();
    }
}
export { getCookie, setCookie,delCookie }