// pages/merchant/mehome/mehome.js
import {
    alert,
    comfirm
} from '../utils/core.js'
import buttonClicked from "../utils/utils.js"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        buttonClicked: false, //防止点击事件
        mode: "scaleToFill",
        arr: [],
        indicatorDots: true,
        autoplay: true,
        interval: 2000,
        duration: 1000,

        limited_time: "",
        limited_content: [],
        hot_content: [],
        spike: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {       
        this.getList();
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

    gogoods(){
        wx.navigateTo({
            url: '/pages/classification/classification',
        })
    },

    
    //每日签到
    goSign(){
        wx.navigateTo({
            url: '/pages/signIn/signIn',
        })
    },

   //积分兑换
    goIntegral() {
        wx.navigateTo({
            url: '/pages/coupon/coupon',
        })
    },

    golimitedDetail(e){
        let id = e.currentTarget.dataset.id;
        
        wx.navigateTo({
            url: '/pages/miaoDetail/miaoDetail?id=' + id,
        })
    },

    //商品详情
    geHotDetail(e) {
        let id = e.currentTarget.dataset.id;

        wx.navigateTo({
            url: '/pages/commodity/commodity?id=' + id,
        })
    },

    //秒杀详情
    spike(e){
        let id = e.currentTarget.dataset.id;
        let num = 1;
        wx.navigateTo({
            url: '/pages/miaoDetail/miaoDetail?id=' + id + '&num=' + num,
        })
    },

    //获取首页所有数据
    getList(){
        wx.showLoading({ title: '加载中', icon: 'loading', duration: 3000 });
        let that = this;
        let baseUrl = wx.getStorageSync('url');
        wx.request({
            url: baseUrl + '/getIndex',
            method: 'get',
            success(res) {
                let m = res.data;
                let arr = that.data.arr;
                let spike = [];
                for (let i = 0; i < m.hotGoods.length; i++) {
                    m.hotGoods[i].pic = baseUrl + m.hotGoods[i].pic;
                }
                for (let i = 0; i < m.spike.length; i++) {
                    spike.push({ id: m.spike[i].id, url: baseUrl + m.spike[i].pic });
                }
                for (let i = 0; i < m.banner.length; i++) {
                    arr.push({ 'img': baseUrl + m.banner[i].pic, 'url': m.banner[i].img_url });
                }
                for (let i = 0; i < m.limited[0].length; i++) {
                    m.limited[0][i].pic = baseUrl + m.limited[0][i].pic;
                }
                that.setData({
                    arr: arr,
                    limited_content: m.limited[0],
                    hot_content: m.hotGoods,
                    limited_time: m.limited.end_time,
                    spike: spike
                })
            },
            fail(err) {
                alert(err.errMsg);
            },
            complete: () => {
                wx.hideLoading()
            }
        })
    }
})