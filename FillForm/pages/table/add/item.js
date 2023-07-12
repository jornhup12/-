// pages/table/add/item.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    mandatory: false, // 必选
    options: [
      // {
      //   label: "选项1",
      //   value: "1"
      // },
      // {
      //   label: "选项2",
      //   value: "2"
      // }
    ],
    option: {
      label: ""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      type: options.type
    })
    var drawerList = [{
        icon: "post",
        type: "singleLine",
        label: "单行输入"
      },
      {
        icon: "post",
        type: "multiLine",
        label: "多行输入"
      },
      {
        icon: "radiobox",
        type: "singleOption",
        label: "单选列表"
      },
      {
        icon: "squarecheck",
        type: "multiOption",
        label: "多选列表"
      },
      {
        type: "pic",
        icon: "pic",
        label: "图片上传"
      }
    ];
    for (let i = 0; i < drawerList.length; i++) {
      if (drawerList[i].type === options.type) {
        wx.setNavigationBarTitle({
          title: drawerList[i].label
        })
        break;
      }
    }
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

  /**
   * 获取switch选择内容
   */
  getSwitchContent(event) {
    this.setData({
      mandatory: event.detail.value
    })
    console.log(this.data.mandatory)
  },

  /**
   * 提交表单
   */
  submitForm(e) {
    const pages = getCurrentPages();
    console.log(e.detail.value);
    var contents = e.detail.value;
    for (let key in contents) {
      if (contents[key] === '') {
        wx.showToast({
          title: '请补充内容',
          icon: 'none',
          duration: 2000
        })
        return
      }
    }
    console.log("data", this.data)
    if ((this.data.type === 'singleOption' || this.data.type === 'multiOption') && this.data.options.length === 0) {
      wx.showToast({
        title: '选项不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    const prevPage = pages[pages.length - 2];
    prevPage.setData({
      newItem: this.data
    })
    wx.navigateBack({
      delta: 1,
      success: function (res) {}
    })
  },

  optioningInput(e) {
    const {
      value
    } = e.detail;
    // console.log(value);
    this.setData({
      option: {
        "label": value
      }
    })
    console.log("option", this.data.option);
  },
  addOption() {
    var option = this.data.option;
    var options = this.data.options;
    if (option.label === '') {
      wx.showToast({
        title: '选项不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    options.push(option);
    this.setData({
      options: options
    })
  },
  /**
   * 删除选项
   */
  deleteOption(event) {
    const index = event.currentTarget.dataset.index;
    const options = this.data.options;
    console.log(this.data.options);
    options.splice(index, 1);
    console.log(this.data.options);
    this.setData({
      options: options
    })
  },titleInput(e) {
    var value = e.detail.value;
    // console.log(e.detail);
    this.setData({
      title: value
    });
  },  /**
   * 监听必选项变化
   */
  isRequiredChange(event) {
    this.setData({
      mandatory: event.detail.value
    })
  },

})
