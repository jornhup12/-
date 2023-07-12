// pages/write/write.js
var api = require("../../http/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionnaireFillList:[],
    elements: [{
      title: '学生健康登记',
      name: '5项',
      color: 'cyan',
      icon: 'newsfill',
      questionnaire:{
        tableName:"学生健康登记",
        tableDescription:"请各位同学（家长协助）提交个人健康信息，谢谢！",
        tables:[{"type": "singleLine", "title": "姓名", "option": {"label": ""}, "options": [], "mandatory": true, "__webviewId__": 476}, {"type": "singleLine", "title": "手机号", "option": {"label": ""}, "options": [], "mandatory": false, "__webviewId__": 477}, {"type": "singleLine", "title": "班级", "option": {"label": ""}, "options": [], "mandatory": true, "__webviewId__": 478}, {"type": "singleOption", "title": "体温", "option": {"label": "高烧"}, "options": [{"label": "正常"}, {"label": "低烧"}, {"label": "高烧"}], "mandatory": false, "__webviewId__": 479}, {"type": "singleOption", "title": "健康状况", "option": {"label": "异常"}, "options": [{"label": "健康"}, {"label": "异常"}], "mandatory": true, "__webviewId__": 480}]
      }
    },
    {
      title: '远程办公日报',
      name: '6项',
      color: 'blue',
      icon: 'colorlens',
      questionnaire:{
        tableName:"远程办公工作日报",
        tableDescription:"请各位同事提交今日工作日报，谢谢！",
        tables:[{"type": "singleLine", "title": "姓名", "option": {"label": ""}, "options": [], "mandatory": true, "__webviewId__": 503}, {"type": "singleLine", "title": "手机号", "option": {"label": ""}, "options": [], "mandatory": false, "__webviewId__": 504}, {"type": "singleOption", "title": "部门", "option": {"label": "产品部"}, "options": [{"label": "行政部"}, {"label": "销售部"}, {"label": "市场部"}, {"label": "研发部"}, {"label": "产品部"}], "mandatory": false, "__webviewId__": 505}, {"type": "singleOption", "title": "是否可以远程办公", "option": {"label": "否"}, "options": [{"label": "是"}, {"label": "否"}], "mandatory": false, "__webviewId__": 506}, {"type": "singleLine", "title": "明日工作计划", "option": {"label": ""}, "options": [], "mandatory": true, "__webviewId__": 507}, {"type": "singleLine", "title": "其他", "option": {"label": ""}, "options": [], "mandatory": false, "__webviewId__": 508}]
      }
    },
    {
      title: '签到表',
      name: '2项',
      color: 'purple',
      icon: 'font',
      questionnaire:{
        tableName:"会议（培训）签到表",
        tableDescription:"请各位同事签到，谢谢！",
        tables:[{"type": "singleLine", "title": "姓名", "option": {"label": ""}, "options": [], "mandatory": true, "__webviewId__": 511}, {"type": "singleLine", "title": "部门", "option": {"label": ""}, "options": [], "mandatory": true, "__webviewId__": 512}]
      }
    },
    {
      title: '通讯录收集',
      name: '5项',
      color: 'mauve',
      icon: 'icon',
      questionnaire:{
        tableName:"通讯录收集",
        tableDescription:"请大家提交各自的基本信息，谢谢大家配合。",
        tables:[{"type": "singleLine", "title": "姓名", "option": {"label": ""}, "options": [], "mandatory": true, "__webviewId__": 514}, {"type": "singleLine", "title": "手机号", "option": {"label": ""}, "options": [], "mandatory": true, "__webviewId__": 515}, {"type": "singleLine", "title": "微信号", "option": {"label": ""}, "options": [], "mandatory": false, "__webviewId__": 516}, {"type": "singleLine", "title": "邮箱", "option": {"label": ""}, "options": [], "mandatory": false, "__webviewId__": 517}, {"type": "singleLine", "title": "身份证号", "option": {"label": ""}, "options": [], "mandatory": true, "__webviewId__": 518}]
      }
    },
    {
      title: '打疫苗报名',
      name: '4项',
      color: 'pink',
      icon: 'btn',
      questionnaire:{
        tableName:"打疫苗报名",
        tableDescription:"需要打疫苗的请填写表单信息",
        tables:[{"type": "singleLine", "title": "姓名", "option": {"label": ""}, "options": [], "mandatory": true, "__webviewId__": 520}, {"type": "singleLine", "title": "手机号", "option": {"label": ""}, "options": [], "mandatory": true, "__webviewId__": 521}, {"type": "singleLine", "title": "身份证号", "option": {"label": ""}, "options": [], "mandatory": false, "__webviewId__": 522}, {"type": "singleLine", "title": "所属部门", "option": {"label": ""}, "options": [], "mandatory": false, "__webviewId__": 523}]
      }
    },
    {
      title: '学习情况日报',
      name: '6项',
      color: 'brown',
      icon: 'tagfill',
      questionnaire:{
        tableName:"学习情况日报",
        tableDescription:"请各位同学提交今日学习情况，谢谢！",
        tables:[{"type": "singleLine", "title": "姓名", "option": {"label": ""}, "options": [], "mandatory": true, "__webviewId__": 525}, {"type": "singleLine", "title": "班级", "option": {"label": ""}, "options": [], "mandatory": false, "__webviewId__": 526}, {"type": "singleOption", "title": "今日是否学习？", "option": {"label": "否"}, "options": [{"label": "是"}, {"label": "否"}], "mandatory": true, "__webviewId__": 528}, {"type": "singleLine", "title": "今日学习内容", "option": {"label": ""}, "options": [], "mandatory": true, "__webviewId__": 529}, {"type": "singleLine", "title": "明日学习计划", "option": {"label": ""}, "options": [], "mandatory": true, "__webviewId__": 530}, {"type": "singleLine", "title": "其他", "option": {"label": ""}, "options": [], "mandatory": false, "__webviewId__": 531}]
      }
    },
    {
      title: '出游报名',
      name: '4项',
      color: 'red',
      icon: 'myfill',
      questionnaire:{
        tableName:"出游报名",
        tableDescription:"请大家提交出游人员信息，携带家属人数",
        tables:[{"type": "singleLine", "title": "姓名", "option": {"label": ""}, "options": [], "mandatory": true, "__webviewId__": 533}, {"type": "singleOption", "title": "性别", "option": {"label": "女"}, "options": [{"label": "男"}, {"label": "女"}], "mandatory": true, "__webviewId__": 534}, {"type": "singleLine", "title": "联系人手机号", "option": {"label": ""}, "options": [], "mandatory": true, "__webviewId__": 535}, {"type": "singleLine", "title": "携带家属人数", "option": {"label": ""}, "options": [], "mandatory": false, "__webviewId__": 536}]
      }
    },
    // {
    //   title: '自定义表格',
    //   name: '8项',
    //   color: 'orange',
    //   icon: 'icloading'
    // },
    // {
    //   title: '边框阴影',
    //   name: 'shadow',
    //   color: 'olive',
    //   icon: 'copy'
    // },
    // {
    //   title: '加载',
    //   name: 'loading',
    //   color: 'green',
    //   icon: 'loading2'
    // },
  ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
navigateToPage(event) {
    let index = event.currentTarget.dataset.index
    var questionnaire = JSON.stringify(this.data.elements[index].questionnaire)
    wx.navigateTo({
      url: `/pages/table/fill/fill?questionnaire=${questionnaire}`
    })
  },

  onLoad(options) {
    
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
    api.fetchQuestionnaireFillList().then(res => {
      this.setData({
        questionnaireFillList:res.data
      })
    }).catch(err => {
      console.log(err)
    })
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

  }
})
