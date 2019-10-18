// pages/cashWithdrawal/cashWithdrawal.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        selectArray: [{ "id": "10", "value": "会计类" }, {
            "id": "21", "text": "工程类"
        }, '技术类', { 'id': '22', 'value': '其他' }],
        keti: '100',
        money: ''

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let str1 = '13991367972'
        let reg = /^(\d{3})\d*(\d{4})$/;
        let str2 = str1.replace(reg, '$1****$2')
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

    quanti(){
        let keti = this.data.keti;
        this.setData({
            money: keti
        })
    },

    confirm(){
        let money = this.data.money;
        wx.request({
            url: '',
            method: 'post',
            data: {
                
            },
            success(res){
                debugger;
                console.log(res);
            },
            fail(err){

            }
        })
    }
})