// pages/commodity/commodity.js
import {
    alert,
    comfirm
} from "../utils/core.js"
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
        gname: '',
        rebate: '',
        server: '负九点十六分距离首府',
        evaluate: '98%',
        time: 122222,
        timer: '',
        day: '',
        hour: '',
        minute: '',
        second: '',
        list: [{ url: '../../image/cart.png', name: '护龙一组', list_con: '附近登陆十分激烈的数据分类的三分零四', image: ['../../image/1.jpg', '../../image/2.jpg'], eval_time: '2019-09-09 18:00'}]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        let num = options.num;
        let status = '';
        if(num == 1){
            status = '1';
        } else {
            status = '3';
        }
        let id = options.id;
        let baseUrl = wx.getStorageSync('url');
        wx.request({
            url: baseUrl + '/getgoodsinfo',
            method: 'get',
            data: {
                id: id,
                status: status
            },
            success(res) {
                if (res.data.code == 1) {
                    let monthly_sales = res.data.data.monthly_sales;
                    let discount_price = res.data.data.discount_price;
                    let gname = res.data.data.gname;
                    let price = res.data.data.price;
                    let pic = [];
                    let rebate = res.data.data.rebate;
                    let end_time = res.data.data.end_time;                                                     let time = '';
                    let m = parseInt(new Date(end_time).getTime()/1000);
                    let n = parseInt((new Date()).valueOf() / 1000);    
                    if(n > m){
                        time = n - m;
                    }        
                    pic.push(baseUrl + res.data.data.pic);             
                    that.setData({
                        discount_price: discount_price,
                        monthly_sales: monthly_sales,
                        gname: gname,
                        price: price,
                        arr: pic,
                        rebate: rebate
               
                    })
             
                    // that.time1();
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
        this.time1();
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
    },

    //倒计时
    time1(){
        let that = this;
        let m = that.data.time;

        that.setData({
            timer: setInterval(function(){
                m--;
                that.setData({
                    time: m,
                    day: Math.floor(parseInt(m) / 3600 / 24),
                    hour: Math.floor(parseInt(m) / 3600 % 24),
                    minute: Math.floor(parseInt(m) / 60 % 60),
                    second: Math.floor(parseInt(m) % 60)
                })
            }, 1000)
        })
    }
})