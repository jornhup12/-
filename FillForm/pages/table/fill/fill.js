// pages/table/fill/fill.js
const api = require("../../../http/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionnaire: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if ("id" in options) {
      const id = options.id;
      api.fetchQuestionnaire({"id": id}).then(res => {
        if (res.code == 200) {
            console.log(res.data);
           this.setData({
          questionnaire: res.data
        })
        }
       
      }).catch(err => {
        console.log(err);
      })
    }else if("questionnaire" in options) {
      var questionnaire = JSON.parse(options.questionnaire);
      questionnaire.id = 0
      this.setData({
        questionnaire: questionnaire
      })
    }
  },onSubmit(event) {
    const formData = event.detail;
    console.log(event)
    const id = this.data.questionnaire.id;
    var tables = formData.tables;
    for (let i = 0; i < tables.length; i++) {
      const table = tables[i];
      if (table.mandatory && (!table.content || table.content.length <= 0)) {
          wx.showToast({
            title: `${table.title}为必填项，请填写`,
            icon: 'none',
            duration: 2000
          })
          return;
      }
    }

    api.addQuestionnaireFill({"questionnaire_id": id, "content": formData}).then(res => {
      if (res.code == 200) {
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 2000)
      }
    }).catch(err => {
      console.log(err);
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
  onShareAppMessage: function(res) {
    console.log(res)
      return {
        title: this.data.questionnaire.title,
        path: '/pages/table/fill/fill?id=' + this.data.questionnaire.id,
      }
    },
})