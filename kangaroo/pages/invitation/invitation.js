// pages/invitation/invitation.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //回调
        if (options.scene) {
            let scene = decodeURIComponent(options.scene);
            //&是我们定义的参数链接方式
            let userId = scene.split("&")[0];
            let recommendId = scene.split('&')[1];
            //其他逻辑处理。。。。。
        }
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

    getQrcode() {
        debugger;
        wx.request({
            url: "https://api.weixin.qq.com/weixin/get-qrcode",//域名省略
            data: {
                page: "pages/index",
                scene: "1234&123",
                width: 300
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            dataType: 'json',
            success: function (res) {
                debugger;
                let qrcodeUrl = res.data;//服务器小程序码地址
            },
            fail: function () { },
            complete: options.complete || function () { }
        })
    }
})