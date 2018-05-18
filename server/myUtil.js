
const utils = require('utility');

//密码加密
module.exports = {
  md5Password:function(val){
    let solt = "-asqe-bxvfds-$GYUG*&)(BCGD!@#$%JJL46/8446**1";
    return utils.md5(utils.md5(val+solt))
  }
}