// pages/assemble/assemble.js
import {
    alert
} from '../utils/core.js'
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
        pinUrl: '',   
        mustData: '8月29日',
        limited_content: [],
        hot_content: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        let baseUrl = wx.getStorageSync('url');
        wx.request({
            url: baseUrl + '/getassemble',
            method: 'get',
            success(res) {
                if (res.data.code == 1) {
                    let m = res.data.data;
                    let banner = m.banner;
                    let list = m.list;
                    let must_buy = m.must_buy;
                    for (let i = 0; i < must_buy.length; i++){
                        must_buy[i].pic = baseUrl + must_buy[i].pic;
                    }
                    for(let i = 0; i < list.length; i++){
                        list[i].pic = baseUrl + list[i].pic;
                    }
                    let illustration = baseUrl + m.illustration[0].pic;
                    let arr = [];
                    for(let i = 0; i < m.banner.length; i++){
                        arr.push(baseUrl + m.banner[i].pic);
                    }
                    that.setData({
                        arr: arr,
                        hot_content: list,
                        pinUrl: illustration,
                        limited_content: must_buy
                    })
                } else {
                    alert('获取失败！');
                }

            },
            fail(err) {
                alert(err.errMsg);
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

    godetail(e){
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/pinDetail/pinDetail?id=' + id,
        })
    }
})