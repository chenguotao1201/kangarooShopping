// pages/commodity/commodity.js
import {
    alert
} from '../utils/core.js'
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
        discount_price: '',
        price: '',
        gname: '辅导老师解放拉萨解放拉萨解放了的撒酒疯',
        server: '负九点十六分距离首府',
        evaluate: '98%',
        list: [{ url: '../../image/cart.png', name: '护龙一组', list_con: '附近登陆十分激烈的数据分类的三分零四', image: ['../../image/1.jpg', '../../image/2.jpg'], eval_time: '2019-09-09 18:00'}],
        list_info: [{ avat: '../../image/1.jpg', name: '南派三叔', person: '仅差一人成团', time: '剩余2小时12分12秒' }, { avat: '../../image/1.jpg', name: '南派三叔', person: '仅差一人成团', time: '剩余2小时12分12秒' }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let id = options.id;
        let that = this;
        let baseUrl = wx.getStorageSync('url');
        wx.request({
            url: baseUrl + '/getgoodsinfo',
            method: 'get',
            data: {
                id: id,
                status: '2'
            },
            success(res){
                if(res.data.code == 1){
                    let pic = []
                    pic.push(baseUrl + res.data.data.pic);
                    let gname = res.data.data.gname;
                    let discount_price = res.data.data.discount_price;
                    let price = res.data.data.price;
                    // let gname = res.data.data.gname;
                    that.setData({
                        arr: pic,
                        gname: gname,
                        discount_price: discount_price,
                        price: price
                    })
                }
            },
            fail(err){
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

    goHome(){
        wx.switchTab({
            url: '/pages/home/home',
        })
    },

    goKefu() {
        wx.navigateTo({
            url: '',
        })
    },
    addCart() {
        let id = this.data.id;
        wx.request({
            url: '',
            data: {
                
            },
            method: 'post',
            success(res){
                wx.switchTab({
                    url: '/pages/cart/cart',
                })
            },
            fail(err){

            }
        })
    },

    buy(){
        let id = this.data.id;
        wx.request({
            url: '',
            data: {

            },
            method: 'post',
            success(res) {
                wx.navigateTo({
                    url: '/pages/orderDetail/orderDetail',
                })
            },
            fail(err) {

            }
        })
    }
})