// pages/manaAddress/manaAddress.js
import {
    alert,
    confirm
} from "../utils/core.js"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],  
        orders_number: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if(options.orders_number){
            this.setData({
                orders_number: options.orders_number
            })
        }      
        this.getAddressList();
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

    sele(e){
        let list = this.data.list;
        let index = e.currentTarget.dataset.index;
        list.forEach(function(item, i){
            item.address_status = '0';
            if(i === index){
                item.selected = '1';
            }
        })
        this.setData({
            list: list
        })
        let id = list[index].id;
    },

    edit(e){
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/editAddress/editAddress?id=' + id,
        })
    },

    //删除地址
    dele(e){
        let that = this;
        let id = e.currentTarget.dataset.id;
        let baseUrl = wx.getStorageSync('url');
        confirm({
            content: `确认删除该地址吗？`, //${address.adress}
            confirmText: '删除',
            ok() {
                wx.request({
                    url: baseUrl + '/getaddress',
                    method: 'get',
                    data: {
                        id: id,
                        action: 'del'
                    },
                    success(res) {
                        if (res.data.code == 1) {
                            wx.showToast({
                                title: '删除成功',
                                icon: 'success',
                                duration: 2000
                            })
                            that.getAddressList();
                        }

                    },
                    fail(err) {
                        alert(err.errMsg);
                    }
                })
            },
            no(){
                return false;
            }
        })
        
    },

    goAddress(){
        wx.navigateTo({
            url: '/pages/addAddress/addAddress',
        })
    },

    getAddressList() {
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
                    for(let i = 0; i < m.length; i++){
                        m[i].address = m[i].address.slice(1, m[i].address.length - 1);
                        let arr = m[i].address.split(",");
                        m[i].address = arr.join(" ");
                    }
                    that.setData({
                        list: m
                    })
                } else {
                    that.setData({
                        list: []
                    })
                }
            },
            fail(err) {
                alert(err.errMsg);
            }
        })
    },

    setAddress(e){
        let that = this;
        let id = e.currentTarget.dataset.id;
        let baseUrl = wx.getStorageSync('url');
        let uid = wx.getStorageSync('uid');
        wx.request({
            url: baseUrl + '/getaddress',
            method: 'get',
            data: {
                id: id,
                uid: uid,
                action: 'edit',
                address_status: '1'
            },
            success(res) {
                if (res.data.code == 1) {
                    let orders_number = that.data.orders_number;
                    if (orders_number != ''){
                        confirm({
                            content: `确认选择该地址吗？`,
                            confirmText: '确定',
                            ok() {
                                wx.navigateTo({
                                    url: '/pages/confirmation/confirmation?orders_number=' + orders_number,
                                })
                            },
                            no() {
                                return false;
                            }
                        })
                    } else {
                        that.getAddressList();
                    }
                    
                }
            },
            fail(err) {
                alert(err.errMsg);
            }
        })
    }
})