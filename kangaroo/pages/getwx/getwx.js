// pages/public/getwx/getwx.js
import {
    alert,
    confirm
} from "../../pages/utils/core.js"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      _num: '1',
      userInfo: {},
      hasUserInfo: false,
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      code: '',
      type: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      wx.login({
          success(data){
              wx.getSetting({
                  success(data) {
                      wx.getUserInfo({
                          
                          success(data) {
                              let avatarUrl = data.userInfo.avatarUrl;
                              let nickName = data.userInfo.nickName;
                              app.globalData.userInfo = {
                                  avatarUrl: avatarUrl,
                                  nickName: nickName
                              }
                              that.setData({
                                  userInfo: data.userInfo
                              })

                          },
                          fail(data) {
                              alert(data.errMsg);
                          }
                      })
                  },
                  fail(data) {
                      alert(data.errMsg);
                  }
              })
          },
          fail(data){
              alert(data.errMsg);
          }
      })        
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

    menuClick(e) {
        this.setData({
            _num: e.currentTarget.dataset.num
        })
    },

    gotologin() {
        
        wx.login({
            success(data) {
                let code = data.code;
                app.globalData.code = code;
                wx.request({
                    url: 'https://xcx.lulianiot.com/onlogin?code=' + code,
                    method: 'get',
                    success(data) {
                        app.globalData.sessionid = data.data.sessionid;
                        let type = data.data.type;
                        let bind = data.data.bind;
                        if(data.data.phonenum){
                            app.globalData.phonenum = data.data.phonenum;
                            // app.globalData.installerId = data.data.installerId;
                        }
                        if(bind == false){
                            wx.navigateTo({
                                url: '/pages/login/login',
                            })
                        } else {
                            if(type == 0){
                                wx.navigateTo({
                                    url: '/pages/install/home/home'
                                })
                            } else if(type == 1){
                                wx.navigateTo({
                                    url: '/pages/merchant/mehome/mehome'
                                })
                            } else if(type == 2){
                                wx.navigateTo({
                                    url: '/pages/merchant/registration/registration'
                                })
                            }
                        }                   
                    },
                    fail(data) {
                        alert(data.errMsg);
                    }
                })
            },
            fail(data) {
                alert('登陆失败' + data.errMsg);
            }
        })

    },

    fanhui(){
        wx.navigateTo({
            url: '/pages/frontMatter/frontMatter',
        })
    }

})