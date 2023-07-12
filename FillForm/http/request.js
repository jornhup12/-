var config = require("./config.js"), utils = require("./utils")

Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => {
      throw reason
    })
  );
};
//封装异步api
const wxPromisify = fn => {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        resolve(res)
      }

      obj.fail = function (res) {
        reject(res)
      }

      fn(obj)
    })
  }
}

const getLocationPromisified = wxPromisify(wx.getLocation); //获取经纬度
const showModalPromisified = wxPromisify(wx.showModal); //弹窗

// 封装post请求
const POST = (url, data) => {
  var signdata=data
  var promise = new Promise((resolve, reject) => {
    //网络请求
    // var signdata=sigUtils.genSig('POST', url, data)
    wx.request({
      url: config.service + url,
      data: signdata,
      method: 'POST',
      header: {
        "content-type": "application/json",
        'cookie': wx.getStorageSync("sessionid"), //读取cookie
      },
      success: function (res) { //服务器返回数据
        if (res.statusCode == 200) {
          resolve(res);
        } else { //返回错误提示信息
          reject(res.data);
        }
      },
      fail: function(res){
        utils.requestFail(res);
        reject(res.data);
      },
      error: function (e) {
        reject('网络出错');
      }
    })
  });
  return promise;
}
// 封装get请求
const GET = (url, data) => {
  // wx.showLoading({
  //   title: '拼命加载中',
  // })
  var signdata=data
  var promise = new Promise((resolve, reject) => {
    //网络请求
    wx.request({
      url: config.service + url,
      data: signdata,
      header: {
        'content-type': 'application/json',
        'cookie': wx.getStorageSync("sessionid") //读取cookie
        // 'token': wx.getStorageSync('token')
      },
      success: function (res) { //服务器返回数据
        // wx.hideLoading()
        if (res.statusCode == 200) {
          // if(res.data.code != 200)wx.showToast({
          //   title: '错误代码:'+res.data.code,
          //   icon: "none"
          // })
          resolve(res);
        } else { //返回错误提示信息
          // wx.showToast({
          //   title: '请求出错:'+res.statusCode,
          //   icon: "none"
          // })
          reject(res);
        }
      },
      fail: function(res){
        utils.requestFail(res);
        reject(res);
      },
      error: function (e) {
        reject('网络出错');
      }
    })
  });
  return promise;
}

// 封装put请求
const PUT = (url, data) => {
  var signdata=data
  var promise = new Promise((resolve, reject) => {
    //网络请求
    wx.request({
      url: config.service + url,
      data: signdata,
      method: 'put',
      header: {
        'content-type': 'application/json',
        'cookie': wx.getStorageSync("sessionid") //读取cookie
      },
      success: function (res) { //服务器返回数据
        if (res.statusCode == 200) {
          resolve(res);
        } else { //返回错误提示信息
          reject(res.data);
        }
      },
      fail: function(res){
        utils.requestFail(res);
        reject(res.data);
      },
      error: function (e) {
        reject('网络出错');
      }
    })
  });
  return promise;
}

// 封delete请求
const DELETE = (url, data) => {
  var signdata=data
  var promise = new Promise((resolve, reject) => {
    //网络请求
    wx.request({
      url: config.service + url,
      data: signdata,
      method: 'delete',
      header: {
        'content-type': 'application/json',
        'cookie': wx.getStorageSync("sessionid") //读取cookie
      },
      success: function (res) { //服务器返回数据
        if (res.statusCode == 200) {
          resolve(res);
        } else { //返回错误提示信息
          reject(res.data);
        }
      },
      fail: function(res){
        utils.requestFail(res);
        reject(res.data);
      },
      error: function (e) {
        reject('网络出错');
      }
    })
  });
  return promise;
}

const other = (url, data, method) => {
  var promise = new Promise((resolve, reject) => {
    //网络请求
    var signdata=data
    wx.request({
      url: url,
      data: signdata,
      method: method,
      header: {
        'content-type': 'application/json',
        'cookie': wx.getStorageSync("sessionid") //读取cookie
        // 'token': wx.getStorageSync('token')
      },
      success: function (res) { //服务器返回数据
        if (res.statusCode == 200) {
          resolve(res);
        } else { //返回错误提示信息
          reject(res.data);
        }
      },
      error: function (e) {
        reject('网络出错');
      }
    })
  });
  return promise;
}

module.exports = {
  POST,
  GET,
  PUT,
  DELETE,
  other,
  getLocationPromisified,
  showModalPromisified,
}