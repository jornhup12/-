// app.js
var api = require("./http/api.js"),store = require("./store.js");
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var t = this
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        api.login(res.code).then(function(res){
          if (res.code == 200) {
            t.globalData.user_id = res.data
            wx.setStorageSync("user_id", res.data)
            store.login = res.data
            api.fetchUserInfo.call(t).then(function(res){
              store.userInfo = res.data
              t.globalData.user = res.data
            })
          } else {
            t.cantVisit()
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
