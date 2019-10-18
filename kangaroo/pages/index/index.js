// pages/merchant/mehome/mehome.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mode: "scaleToFill",
        arr: [],
        indicatorDots: true,
        autoplay: true,
        interval: 2000,
        duration: 1000,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var array = this.data.arr
        for (let i = 1; i < 3; i++) {
            array.push("/image/" + i + ".jpg")
        }
        this.setData({ arr: array })

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
        this.pageLoading = !1;
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

    bindPickerChange(e) {
        let ary = this.data.aryid;
        let id = ary[e.detail.value];
        this.setData({
            index: e.detail.value,
            id: id
        })
        // let data = {
        //     id: ary[e.detail.value]
        // }

    },

    plaque() {
        let id = this.data.aryid[this.data.index];
        if (!this.pageLoading) {
            this.pageLoading = !0;
            wx.navigateTo({
                url: '/pages/merchant/program/program?id=' + id,
            })
        }
    },

    gotocon() {
        let id = this.data.aryid[this.data.index];
        if (!this.pageLoading) {
            this.pageLoading = !0;
            wx.navigateTo({
                url: '/pages/merchant/contentlist/contentlist?id=' + id,
            })
        }
    },

    goLed() {
        let id = this.data.aryid[this.data.index];
        if (!this.pageLoading) {
            this.pageLoading = !0;
            wx.navigateTo({
                url: '/pages/merchant/LEDmanage/LEDmanage?id=' + id,
            })
        }
    },

    gotomen() {
        let phone = this.data.phone;
        if (!this.pageLoading) {
            this.pageLoading = !0;
            wx.navigateTo({
                url: '/pages/merchant/store/store?phone=' + phone,
            })
        }
    },

    message() {
        let id = this.data.aryid[this.data.index];
        if (!this.pageLoading) {
            this.pageLoading = !0;
            wx.navigateTo({
                url: '/pages/merchant/message/message?id=' + id,
            })
        }
    },

    paibian() {
        let id = this.data.aryid[this.data.index];
        let phone = this.data.phone;
        if (!this.pageLoading) {
            this.pageLoading = !0;
            wx.navigateTo({
                url: '/pages/merchant/plaque/plaque?id=' + id + '&phone=' + phone
            })
        }
    },

    guanggao() {
        let id = this.data.aryid[this.data.index];
        if (!this.pageLoading) {
            this.pageLoading = !0;
            wx.navigateTo({
                url: '/pages/merchant/billboard/billboard?id=' + id,
            })
        }
    },
    set() {
        let id = this.data.aryid[this.data.index];
        let phone = this.data.phone;
        if (!this.pageLoading) {
            this.pageLoading = !0;
            wx.navigateTo({
                url: '/pages/set/set?id=' + id + '&phone=' + phone,
            })
        }
    }
})