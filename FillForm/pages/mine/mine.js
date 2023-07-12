var store = require("../../store")
var api = require("../../http/api")

// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      user_fill_questionnaire_count: store.userInfo.user_fill_questionnaire_count,
      user_questionnaire_count: store.userInfo.user_questionnaire_count
    })
    // wx.getUserInfo({
    //   success: function(res) {
    //     console.log(res.userInfo)
    //     aaa.setData({
    //       userInfo :res.userInfo
    //     })
    //   }
    // })
    var that = this
    api.fetchUserInfo().then(res => {
      store.userInfo = res.data
      that.setData({
        userInfo: res.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  backuserInfo(e) {
    var that = this
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        console.log('success', res.userInfo)
        // store.data.userInfo = res.userInfo
        api.editUserInfo({
          nick: res.userInfo.nickName,
          sex: res.userInfo.gender,
          avatar: res.userInfo.avatarUrl
        }).then(res => {
          if (res.code == 200) {
            that.onLoad()
          } else if (res.code == 400) {
          }
        })
      }, fail:(res) =>{
        console.log('fail', res)
      }
    })
  },
})