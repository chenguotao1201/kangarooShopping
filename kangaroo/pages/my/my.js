// pages/my/my.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        name: '',
        avatar: '',
        profit: '2323',
        integral: '322'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let m = wx.getStorageSync('user');
        this.setData({
            name: m.name,
            avatar: m.avatar
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

    //提现记录
    goDiscountRecord(){
        wx.navigateTo({
            url: '/pages/discountRecord/discountRecord',
        })
    },

    //提现
    goCashWithdrawal(){
        wx.navigateTo({
            url: '/pages/cashWithdrawal/cashWithdrawal',
        })
    },

    //签到
    goSign(){
        wx.navigateTo({
            url: '/pages/signIn/signIn',
        })
    },

    //我的优惠券
    goCoupon(){
        wx.navigateTo({
            url: '/pages/myCoupon/myCoupon',
        })
    },

    //积分兑换
    goCoupon(){
        wx.navigateTo({
            url: '/pages/coupon/coupon',
        })
    },

    //收益明细
    goProfit() {
        wx.navigateTo({
            url: '/pages/myProfit/myProfit',
        })
    },

    //我的订单
    goOrder() {
        wx.navigateTo({
            url: '/pages/order/order?num=0',
        })
    },

    //我的积分
    gomyIntegral(){
        wx.navigateTo({
            url: '/pages/myIntegral/myIntegral',
        })
    },

    //我的团队
    gomyTeam(){
        wx.navigateTo({
            url: '/pages/myTeam/myTeam',
        })
    },

    //收货地址
    goManaAdd(){
        wx.navigateTo({
            url: '/pages/manaAddress/manaAddress',
        })
    }, 

     //绑定手机号
    gobindPhone(){
        wx.navigateTo({
            url: '/pages/login/login',
        })
    },

    //帮助与客服
    goCustomer(){
        wx.navigateTo({
            url: '/pages/customer/customer',
        })
    },

    //邀请好友
    goinvitation(){
        wx.navigateTo({
            url: '/pages/invitation/invitation',
        })
    },

    daifu(){
        wx.navigateTo({
            url: '/pages/order/order?num=1',
        })
    },
    daifa() {
        wx.navigateTo({
            url: '/pages/order/order?num=2',
        })
    },
    daishou() {
        wx.navigateTo({
            url: '/pages/order/order?num=3',
        })
    },
    daiping() {
        wx.navigateTo({
            url: '/pages/order/order?num=4',
        })
    },

    daituan(){
        wx.navigateTo({
            url: '/pages/clustering/clustering',
        })
    },

    shouhou(){
        wx.navigateTo({
            url: '/pages/returnGoods/returnGoods',
        })
    }

})