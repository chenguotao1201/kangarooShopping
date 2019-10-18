// pages/myProfit/myProfit.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        profit: '100',
        list: [{ url: '../../image/pin.png', phone: '13333333333', money: '100', date: '2018-18-18', time: '19:00' }, { url: '../../image/pin.png', phone: '13333333333', money: '100', date: '2018-18-18', time: '19:00' }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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

    //提现
    goCashWithdrawal() {
        wx.navigateTo({
            url: '/pages/cashWithdrawal/cashWithdrawal',
        })
    },
})