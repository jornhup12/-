var r = require("./request.js"), c = require("./config.js"), s = require("../store.js");
const store = require("../store.js")


Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => {
      throw reason
    })
  );
};



function getPage() {
  var pages = getCurrentPages() //获取加载的页面
  var currentPage = pages[pages.length - 1] //获取当前页面的对象
  var url = currentPage.route //当前页面url
  return url
}

function logHandle(url, data) {
  if (c.debug||1) {
    console.log({
      "[page]": getPage(),
      "[url]": url,
      "[data]": data
    })
  }
}

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

// User api
function login(data){
  var path = "/user/login/" + data, promise = new Promise((resolve, reject) => {
    r.POST(path, data).then(function (res) {
      logHandle(path, res.data)
      wx.setStorageSync("sessionid", res.header["Set-Cookie"])
      resolve(res.data);
    }).catch((e) => {
      console.log("error", e)
    })
  })
  return promise;
}

function testLogin(data){
  var path = "/user/test/login", promise = new Promise((resolve, reject) => {
    r.POST(path, data).then(function (res) {
      logHandle(path, res.data)
      wx.setStorageSync("sessionid", res.header["Set-Cookie"])
      resolve(res.data);
    }).catch((e) => {
      console.log("error", e)
    })
  })
  return promise;
}

function fetchUserInfo(data){
  var path = "/user", promise = new Promise((resolve, reject) => {
    r.GET(path, data).then(function (res) {
      logHandle(path, res.data)
      resolve(res.data);
    }).catch((e) => {
      console.log("error", e)
    })
  })
  return promise;
}

function deleteUser(data){
  var path = "/user", promise = new Promise((resolve, reject) => {
    r.DELETE(path, data).then(function (res) {
      logHandle(path, res.data)
      resolve(res.data);
    }).catch((e) => {
      console.log("error", e)
    })
  })
  return promise;
}

function todoList(data)
{
  var path = "/user/todo", promise = new Promise((resolve, reject) => {
    r.GET(path, data).then(function (res) {
      logHandle(path, res.data)
      resolve(res.data);
    }).catch((e) => {
      console.error("error", e)
    })
  })
  return promise;
}


function removeTodo(data)
{
  var path = "/user/todo", promise = new Promise((resolve, reject) => {
    r.DELETE(path, data).then(function (res) {
      logHandle(path, res.data)
      resolve(res.data);
    }).catch((e) => {
      console.error("error", e)
    })
  })
  return promise;
}


function editTodo(data)
{
  var path = "/user/todo", promise = new Promise((resolve, reject) => {
    r.PUT(path, data).then(function (res) {
      logHandle(path, res.data)
      resolve(res.data);
    }).catch((e) => {
      console.error("error", e)
    })
  })
  return promise;
}

function addTodo(data)
{
  var path = "/user/todo", promise = new Promise((resolve, reject) => {
    r.POST(path, data).then(function (res) {
      logHandle(path, res.data)
      resolve(res.data);
    }).catch((e) => {
      console.error("error", e)
    })
  })
  return promise;
}

function fetchAdvertisingList (data)  {
  var path = "/user/advertising", promise = new Promise((resolve, reject) => {
    r.GET(path, data).then(function (res) {
      logHandle(path, res.data)
      resolve(res.data);
    }).catch((e) => {
      console.log("error", e)
    })
  })
  return promise;
}

function addUserShare(data){
  var path = "/user/share", promise = new Promise((resolve, reject) => {
    r.POST(path, data).then(function (res) {
      logHandle(path, res.data)
      resolve(res.data);
    }).catch((e) => {
      console.log("error", e)
    })
  })
  return promise;
}

function addUserSign(data){
  var path = "/user/sign",  promise = new Promise((resolve, reject) => {
    r.POST(path, data).then(function (res) {
      logHandle(path, res.data)
      resolve(res.data);
    }).catch((e) => {
      console.log("error", e)
      reject(e)
    })
  })
  return promise;
}



function fetchQuestionnaireList(data){
  var path = "/table/questionnaire/list", promise = new Promise((resolve, reject) => {
    r.GET(path, data).then(function (res) {
      logHandle(path, res.data)
      resolve(res.data);
    }).catch((e) => {
      console.log("error", e)
    })
  })
  return promise;
}

function fetchQuestionnaire(data){
  var path = "/table/questionnaire", promise = new Promise((resolve, reject) => {
    r.GET(path, data).then(function (res) {
      logHandle(path, res.data)
      resolve(res.data);
    }).catch((e) => {
      console.log("error", e)
    })
  })
  return promise;
}



function deleteQuestionnaire(data){
  var path = "/table/questionnaire", promise = new Promise((resolve, reject) => {
    r.DELETE(path, data).then(function (res) {
      logHandle(path, res.data)
      resolve(res.data);
    }).catch((e) => {
      console.log("error", e)
    })
  })
  return promise;
}

function deleteQuestionnaireFill(data) {
  var path = "/table/questionnaire/fill", promise = new Promise((resolve, reject) => {
    r.DELETE(path, data).then(function (res) {
      logHandle(path, res.data)
      resolve(res.data);
    }).catch((e) => {
      console.log("error", e)
    })
  })
  return promise;
}


function fetchUserCard(data){
  var path = "/user/card",  promise = new Promise((resolve, reject) => {
    r.GET(path, data).then(function (res) {
      logHandle(path, res.data)
      resolve(res.data);
    }).catch((e) => {
      console.log("error", e)
      reject(e)
    })
  })
  return promise;
}

function copyUserCard(data){
  var path = "/user/brick/copymocard",  promise = new Promise((resolve, reject) => {
    r.POST(path, data).then(function (res) {
      logHandle(path, res.data)
      resolve(res.data);
    }).catch((e) => {
      console.log("error", e)
      reject(e)
    })
  })
  return promise;
}


function addUserCard(data){
  var path = "/user/card",  promise = new Promise((resolve, reject) => {
    r.POST(path, data).then(function (res) {
      logHandle(path, res.data)
      resolve(res.data);
    }).catch((e) => {
      console.log("error", e)
      reject(e)
    })
  })
  return promise;
}


function clockStatus(data){
  var path = "/user/clock/status",  promise = new Promise((resolve, reject) => {
    r.GET(path, data).then(function (res) {
      logHandle(path, res.data)
      resolve(res.data);
    }).catch((e) => {
      console.log("error", e)
      reject(e)
    })
  })
  return promise;
}


function clockList(data){
  var path = "/user/clock/list",  promise = new Promise((resolve, reject) => {
    r.GET(path, data).then(function (res) {
      logHandle(path, res.data)
      resolve(res.data);
    }).catch((e) => {
      console.log("error", e)
      reject(e)
    })
  })
  return promise;
}

function subscribe(data){
  var path = "/user/subscribe",  promise = new Promise((resolve, reject) => {
    r.GET(path, data).then(function (res) {
      logHandle(path, res.data)
      resolve(res.data);
    }).catch((e) => {
      console.log("error", e)
      reject(e)
    })
  })
  return promise;
}

function disStarUser(data){
  var path = "/user/star",  promise = new Promise((resolve, reject) => {
    r.DELETE(path, data).then(function (res) {
      logHandle(path, res.data)
      resolve(res.data);
    }).catch((e) => {
      console.log("error", e)
      reject(e)
    })
  })
  return promise;
}

function fetchUserCardList(data){
  var path = "/user/card/list",  promise = new Promise((resolve, reject) => {
    r.GET(path, data).then(function (res) {
      logHandle(path, res.data)
      resolve(res.data);
    }).catch((e) => {
      console.log("error", e)
      reject(e)
    })
  })
  return promise;
}

function addUserCardBrowse(data){
  var path = "/user/card/browse",  promise = new Promise((resolve, reject) => {
    r.POST(path, data).then(function (res) {
      logHandle(path, res.data)
      resolve(res.data);
    }).catch((e) => {
      console.log("error", e)
      reject(e)
    })
  })
  return promise;
}



function addFeedback(data){
  var path = "/user/feedback",  promise = new Promise((resolve, reject) => {
    r.POST(path, data).then(function (res) {
      logHandle(path, res.data)
      resolve(res.data);
    }).catch((e) => {
      console.log("error", e)
      reject(e)
    })
  })
  return promise;
}

function addQuestionnaire(data){
  var path = "/table/questionnaire",  promise = new Promise((resolve, reject) => {
    r.POST(path, data).then(function (res) {
      logHandle(path, res.data)
      resolve(res.data);
    }).catch((e) => {
      console.log("error", e)
      reject(e)
    })
  })
  return promise;
}

function addQuestionnaireFill(data){
  var path = "/table/questionnaire/fill",  promise = new Promise((resolve, reject) => {
    r.POST(path, data).then(function (res) {
      logHandle(path, res.data)
      resolve(res.data);
    }).catch((e) => {
      console.log("error", e)
      reject(e)
    })
  })
  return promise;
}

function fetchQuestionnaireFillList(data){
  var path = "/table/questionnaire/fill/list",  promise = new Promise((resolve, reject) => {
    r.GET(path, data).then(function (res) {
      logHandle(path, res.data)
      resolve(res.data);
    }).catch((e) => {
      console.log("error", e)
      reject(e)
    })
  })
  return promise;
}



function editUserInfo(data){
  var path = "/user",  promise = new Promise((resolve, reject) => {
    r.PUT(path, data).then(function (res) {
      logHandle(path, res.data)
      resolve(res.data);
    }).catch((e) => {
      console.log("error", e)
      reject(e)
    })
  })
  return promise;
}

function addUserMoment(data){
  var path = "/user/moment",  promise = new Promise((resolve, reject) => {
    r.POST(path, data).then(function (res) {
      logHandle(path, res.data)
      resolve(res.data);
    }).catch((e) => {
      console.log("error", e)
      reject(e)
    })
  })
  return promise;
}


function addUserVisit(data){
  var path = "/user/visit",  promise = new Promise((resolve, reject) => {
    r.GET(path, data).then(function (res) {
      logHandle(path, res.data)
      resolve(res.data);
    }).catch((e) => {
      console.log("error", e)
      reject(e)
    })
  })
  return promise;
}


function deleteUserMoment(data){
  var path = "/user/moment",  promise = new Promise((resolve, reject) => {
    r.DELETE(path, data).then(function (res) {
      logHandle(path, res.data)
      resolve(res.data);
    }).catch((e) => {
      console.log("error", e)
      reject(e)
    })
  })
  return promise;
}

function fetchUserMomentList(data){
  var path = "/user/moment/list",  promise = new Promise((resolve, reject) => {
    r.GET(path, data).then(function (res) {
      logHandle(path, res.data)
      resolve(res.data);
    }).catch((e) => {
      console.log("error", e)
      reject(e)
    })
  })
  return promise;
}


function praiseUserMoment(data){
  var path = "/user/moment/praise",  promise = new Promise((resolve, reject) => {
    r.POST(path, data).then(function (res) {
      logHandle(path, res.data)
      resolve(res.data);
    }).catch((e) => {
      console.log("error", e)
      reject(e)
    })
  })
  return promise;
}

function disPraiseUserMoment(data){
  var path = "/user/moment/praise",  promise = new Promise((resolve, reject) => {
    r.DELETE(path, data).then(function (res) {
      logHandle(path, res.data)
      resolve(res.data);
    }).catch((e) => {
      console.log("error", e)
      reject(e)
    })
  })
  return promise;
}



// Annunciate api
function fetchAnnuciateList(data){
  var path = "/annunciate/list", promise = new Promise((resolve, reject) => {
    r.GET(path, data).then(function (res) {
      logHandle(path, res.data)
      resolve(res.data);
    }).catch((e) => {
      console.log("error", e)
    })
  })
  return promise;
}

function fetchAnnuciateCardList(data){
  var path = "/annunciate/card", promise = new Promise((resolve, reject) => {
    r.GET(path, data).then(function (res) {
      logHandle(path, res.data)
      resolve(res.data);
    }).catch((e) => {
      console.log("error", e)
    })
  })
  return promise;
}
// Admin api
function fetchPosterUrl(data){
  var path = "/admin/poster", promise = new Promise((resolve, reject) => {
    r.GET(path, data).then(function (res) {
      logHandle(path, res.data)
      resolve(res.data);
    }).catch((e) => {
      console.log("error", e)
    })
  })
  return promise;
}

function fetchCardList(data){
  var path = "/admin/card/list", promise = new Promise((resolve, reject) => {
    r.GET(path, data).then(function (res) {
      logHandle(path, res.data)
      resolve(res.data);
    }).catch((e) => {
      console.log("error", e)
    })
  })
  return promise;
}

// Chat api
function fetchGroupSend(data){
  var path = "/chat/group", promise = new Promise((resolve, reject) => {
    r.GET(path, data).then(function (res) {
      logHandle(path, res.data)
      resolve(res.data);
    }).catch((e) => {
      console.log("error", e)
    })
  })
  return promise;
}

function addGroupInfo(data){
  var path = "/chat/group", promise = new Promise((resolve, reject) => {
    r.POST(path, data).then(function (res) {
      logHandle(path, res.data)
      resolve(res.data);
    }).catch((e) => {
      console.log("error", e)
    })
  })
  return promise;
}

function fetchAgentList(data){
  var path = "/user/agent/list", promise = new Promise((resolve, reject) => {
    r.GET(path, data).then(function (res) {
      logHandle(path, res.data)
      resolve(res.data);
    }).catch((e) => {
      console.log("error", e)
    })
  })
  return promise;
}

// 下载文件
function downloadFile(fileUrl, type="image"){
  var promise = new Promise((resolve, reject)=>
  wx.downloadFile({
    url: fileUrl,
    success: function (res) {
      var benUrl = res.tempFilePath;
      if(type == "video")
      wx.saveVideoToPhotosAlbum({
        filePath: benUrl,
        success: function (res) {
          resolve(res);
        },
      })
      else
      wx.saveImageToPhotosAlbum({
        filePath: benUrl,
        success: function (res) {
          resolve(res);
        },
        //授权失败
        fail: function (err) {
          if (err.errMsg) { //重新授权弹框确认
            wx.showModal({
              title: '提示',
              content: '您好,请先授权，在保存此图片。',
              showCancel: false,
              success(res) {
                if (res.confirm) { //重新授权弹框用户点击了确定
                  wx.openSetting({ //进入小程序授权设置页面
                    success(settingdata) {
                      if (settingdata.authSetting['scope.writePhotosAlbum']) { //用户打开了保存图片授权开关
                        wx.saveImageToPhotosAlbum({
                          filePath: benUrl,
                          success: function (res) {
                            resolve(res);
                          },
                        })
                      } else { //用户未打开保存图片到相册的授权开关
                        wx.showModal({
                          title: '温馨提示',
                          content: '授权失败，请稍后重新获取',
                          showCancel: false,
                        })
                      }
                    }
                  })
                }
              }
            })
          }
        }
      })
    }
  }))
  return promise;
}

// 上传文件
function uploadFile(type="image", src) {
  var path = "/user/img"
  return new Promise((resolve, reject) =>
    wx.uploadFile({
      url: c.service + path, //仅为示例，非真实的接口地址
      filePath: src,
      name: 'img',
      header: {
        "content-type": "application/json"
      },
      formData: {
        type: type,
      },
      success: function (res) {
        logHandle(path, res.data)
        var jsdata = JSON.parse(res.data)
        resolve(jsdata.data.url)
      },
      fail: function (res) {
        console.log("[add.js] /user/img 请求失败", res.data)
      }
    })
  )
}
module.exports = {
  login,
  testLogin,
  addFeedback,
  addQuestionnaire,
  addQuestionnaireFill,
  fetchQuestionnaireFillList,
  fetchAnnuciateList,
  fetchQuestionnaireList,
  deleteQuestionnaire,
  deleteQuestionnaireFill,
  editTodo,
  removeTodo,
  fetchAnnuciateCardList,
  fetchQuestionnaire,
  fetchUserInfo,
  todoList,
  addTodo,
  fetchUserCard,
  fetchUserMomentList,
  praiseUserMoment,
  disPraiseUserMoment,
  deleteUserMoment,
  copyUserCard,
  addUserShare,
  addUserSign,
  addUserVisit,
  addUserMoment,
  fetchPosterUrl,
  fetchGroupSend,
  addGroupInfo,
  fetchCardList,
  subscribe,
  disStarUser,
  fetchUserCardList,
  addUserCardBrowse,
  editUserInfo,
  clockList,
  addUserCard,
  downloadFile,
  uploadFile,
  fetchAgentList,
  deleteUser
}