// pages/order/order.js
import {
    alert
} from "../utils/core.js"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentData: 0,
        orderList: [],
        autoHeight: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let num = options.num;
        this.setData({
            currentData: num
        })
        this.getOrderList(num);
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
        // this.getOrderList();
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

    //获取当前滑块的index
    bindchange: function (e) {
        const that = this;
        that.setData({
            currentData: e.detail.current
        })
        this.getOrderList(e.detail.current);
    },
    //点击切换，滑块index赋值
    checkCurrent: function (e) {
        const that = this;

        if (that.data.currentData === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                currentData: e.target.dataset.current
            })
        }

        this.getOrderList(e.target.dataset.current);
    },

    //获取订单列表
    getOrderList(id){
        wx.showLoading({ title: '加载中', icon: 'loading', duration: 3000 });
        let that = this;
        let baseUrl = wx.getStorageSync('url');
        let uid = wx.getStorageSync('uid');
        wx.request({
            url: baseUrl + '/getorders',
            method: 'get',
            data: {
                uid: uid,
                status: id
            },
            success(res){
                if(res.data.code == 1){
                    let list = res.data.data;
                    let autoHeight = list.length * 560 + 800
                    for (let i = 0; i < list.length; i++) {
                        for (let j = 0; j < list[i].goods.length; j++) {
                            list[i].goods[j].pic = baseUrl + list[i].goods[j].pic;
                        }
                    }
                    that.setData({
                        orderList: list,
                        autoHeight: autoHeight
                    })
                } else {
                    that.setData({
                        orderList: [],
                        autoHeight: 800
                    })
                }              
            },
            fail(err){
                alert(err.errMsg);
            },
            complete: () => {
                wx.hideLoading()
            }
        })
    },

    //跳转支付页
    goconfirm(e){
        let orders_num = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/confirmation/confirmation?orders_number=' + orders_num,
        })
    },

    //取消订单
    cancel(e){
        let id = e.currentTarget.dataset.id;
        let baseUrl = wx.getStorageSync('url');
        let uid = wx.getStorageSync('uid');
        wx.request({
            url: baseUrl + '/getorders',
            method: 'get',
            data: {
                uid: uid,
                id: id
            },
            success(res){
                debugger;
            },
            fail(err){
                alert(err.errMsg);
            }
        })
    }

})