// pages/confirmation/confirmation.js
import {
    alert
} from "../utils/core.js"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isaddress: false,
        addressee: '',
        phone: '',      
        price: '298.00',
        count: '1',
        address: '',
        orders_number: '',
        list: [],
        id: '', //订单id
        selectArray: [{"id": "10","value": "会计类"}, {"id": "21","text": "工程类"
}, '技术类', {'id': '22', 'value': '其他' }]
   
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
        let orders_number = options.orders_number;
        this.setData({
            orders_number: orders_number
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
        this.getOrderInfo();
        this.getAddressList();
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
    select(e) {
        console.log(e.detail)        
    },

    goAddress(){
        let orders_number = this.data.orders_number;
        wx.navigateTo({
            url: '/pages/addAddress/addAddress?orders_number=' + orders_number,
        })
    },

    getOrderInfo(){
        let that = this;
        let baseUrl = wx.getStorageSync('url');
        let uid = wx.getStorageSync('uid');
        let orders_number = this.data.orders_number;
        wx.request({
            url: baseUrl + '/getorders',
            method: 'get',
            data: {
                orders_num: orders_number,
                uid: uid,
                status: 0
            },
            success(res){
                if(res.data.code == 1){
                    let m = res.data.data[0].goods;
                    for(let i = 0; i < m.length; i++){
                        m[i].pic = baseUrl + m[i].pic;
                    }
                    that.setData({
                        list: m
                    })
                }
            },
            fail(err){
                alert(err.errMsg);
            }
        })
    },

    getAddressList(){
        let that = this;
        let baseUrl = wx.getStorageSync('url');
        let uid = wx.getStorageSync('uid');
        wx.request({
            url: baseUrl + '/getaddress',
            method: 'get',
            data: {
                uid: uid
            },
            success(res) {
                if (res.data.code == 1) {
                    let m = res.data.data;
                    let address = '';
                    let addressee = '';
                    let phone = '';
                    let id = '';
                    for (let i = 0; i < m.length; i++) {
                        if (m[i].address_status == 1) {
                            m[i].address = m[i].address.slice(1, m[i].address.length - 1);
                            let arr = m[i].address.split(",");
                            m[i].address = arr.join(" ");
                            address = m[i].address + "  " + "  " +  m[i].address_info;
                            addressee = m[i].name;
                            phone = m[i].phone;
                            id = m[i].id;
                        } else {
                            m[0].address = m[0].address.slice(1, m[0].address.length - 1);
                            let arr = m[0].address.split(",");
                            m[0].address = arr.join(" ");
                            address = m[0].address + "  " + m[0].address_info;
                            addressee = m[0].name;
                            phone = m[0].phone;
                            id = m[0].id;
                        }
                    }
                    that.setData({
                        address: address,
                        addressee: addressee,
                        phone: phone,
                        id: id
                    })
                }
            },
            fail(err) {
                alert(err.errMsg);
            }
        })
    },

    //向服务请求支付参数
    goPay() {
        let addressee = this.data.addressee;
        if (addressee == ''){
            alert('您还没有添加收货地址哦！');
            return false;
        }
        let that = this;
        let baseUrl = wx.getStorageSync('url');
        let uid = wx.getStorageSync('uid');
        let orders_num = this.data.orders_number;
            that.data.disabled = true;
            wx.request({
                url: baseUrl + '/wxpay',
                data: {
                    orders_num: orders_num,
                    uid: uid
                },
                success: function (ds) {
                    debugger;
                    // wx.hideNavigationBarLoading();
                    wx.requestPayment({
                        'timeStamp': ds.data.timeStamp,
                        'nonceStr': ds.data.nonceStr,
                        'package': ds.data.package,
                        'paySign': ds.data.paySign,
                        'signType': 'MD5',
                        'success': function (res) {
                            wx.navigateTo({
                                url: '/pages/order/order',
                            })
                        },
                        'fail': function (res) {
                            alert(res.errMsg);
                        }
                    })
                },
                error: function (data) {
                    Toast({
                        duration: 2000,
                        msg: '内部错误，购买失败'//data.data
                    });
            }
        });
    },

    goseleAddress(){
        let orders_number = this.data.orders_number;
        wx.navigateTo({
            url: '/pages/manaAddress/manaAddress?orders_number=' + orders_number,
        })
    }
})