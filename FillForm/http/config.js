var host = 'http://122.152.221.118:9000/v1'; //host替换成微信小程序认证的域名
const _debug = true;
var config = {
  service: _debug?'http://127.0.0.1:9000/v1':host,
  imageUrl: host + '/user/img?url=image/',
  debug: _debug,
};
 
module.exports = config;