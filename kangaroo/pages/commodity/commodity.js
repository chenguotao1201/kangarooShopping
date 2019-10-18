// pages/commodity/commodity.js
import {
    alert,
    convertHtmlToText
} from "../utils/core.js"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        buttonClicked: false, //防止点击事件
        mode: "scaleToFill",
        arr: [],
        id: '',
        indicatorDots: true,
        autoplay: true,
        interval: 2000,
        gname: '',
        monthly_sales: '',
        detailsText: '',
        price: '',
        discount_price: '',
        server: '负九点十六分距离首府',
        evaluate: '98%',
        arrImg: [],
        list: [{ url: '../../image/cart.png', name: '护龙一组', list_con: '附近登陆十分激烈的数据分类的三分零四', image: ['../../image/1.jpg', '../../image/2.jpg'], eval_time: '2019-09-09 18:00'}]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        // var array = this.data.arr
        // for (let i = 1; i < 3; i++) {
        //     array.push("../../image/" + i + ".jpg")
        // }
        // this.setData({ arr: array });
        let id = options.id;
        let baseUrl = wx.getStorageSync('url');
        wx.request({
            url: baseUrl + '/getgoodsinfo',
            method: 'get',
            data: {
                id: id,
                status: 0
            },
            success(res){
                if(res.data.code == 1){
                    let monthly_sales = res.data.data.monthly_sales;
                    let discount_price = res.data.data.discount_price;
                    let gname = res.data.data.gname;
                    let price = res.data.data.price;
                    let id = res.data.data.id;
                    let pic = [];
                    let lntroduction = res.data.data.lntroduction;
                    pic.push(baseUrl + res.data.data.pic);
                    that.setData({
                        discount_price: discount_price,
                        monthly_sales: monthly_sales,
                        gname: gname,
                        price: price,
                        arr: pic,
                        id: id,
                        detailsText: convertHtmlToText(lntroduction),
                    })
                } else {
                    alert('获取失败！');
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
        let baseUrl = wx.getStorageSync('url');
        let uid = wx.getStorageSync('uid');
        let id = this.data.id;
        wx.request({
            url: baseUrl + '/getshopcar',
            data: {
                uid: uid,
                action: 'add',
                goods_id: id
            },
            method: 'get',
            success(res){
                if(res.data.code == 1){
                    wx.switchTab({
                        url: '/pages/cart/cart',
                    })
                }else{
                    alert(res.data.msg);
                }               
            },
            fail(err){

            }
        })
    },

    buy(){
        let id = this.data.id;
        let uid = wx.getStorageSync('uid');
        let baseUrl = wx.getStorageSync('url');
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
    },

    //分享
    onShareAppMessage: function () {
        let item = {
            price: 8000,
            gname: '东风一号'
        }
        return {
            title: '分享商品',
            path: '/pages/detail/detail?item=' + JSON.stringify(item),
            success: function (res) {
                console.log(res)
            }
        }
    },
})