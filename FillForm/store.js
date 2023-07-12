module.exports = {
  that: this,
  login: false,
  userInfo: null,
  statusBarHeight: 0,
  navTop: 0, //胶囊按钮与顶部的距离
  navHeight: 0, //导航高度
  data: {
    userInfo: null,
    template: null,
    imagePaths: [],
    len: 0,
    showBirthday: !0,
    showBwh: !0,
    showPhone: !1,
    showBlog: !1
  },
  updateAll: !0,
  reset: function() {
      this.login = false,
      this.data = {
        userInfo: null,
        template: null,
        imagePaths: [],
        len: 0,
        showBirthday: !0,
        showBwh: !0,
        showPhone: !1,
        showBlog: !1
      }
  },
  log: function() {
      console.log(this);
  }
};