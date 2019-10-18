// pages/public/login/login.js
let app = getApp();
import {
    alert,
    toast,
    confirm,
    fetch
} from '../utils/core';

import {

} from '../utils/apis'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        disabled:false,
        getcode: '获取验证码',
        phone: '',
        code: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
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

    onInputPhone(e){
        this.setData({
            phone: e.detail.value
        })
    },

    onInputPwd(e){
        this.setData({
            code: e.detail.value
        })
    },

    // 获取验证码
    getnum() {
        let that = this;
        let phonenum = this.data.phone;
        let myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
        if (phonenum == ''){
            alert('手机号不能为空！');
            return false;
        } else if (!myreg.test(phonenum)){
            alert('请输入正确的手机号');
            return false;
        } else {
            wx.request({
                url: 'https://xcx.lulianiot.com/sms?phonenum=' + phonenum,
                method: 'get',
                success(data){
                    alert('短信已发送请等待！');
                },
                fail(data){
                    alert(data.error);
                }

            })
            
        }
        let time = 60;
        that.setData({
            getcode: '60秒后重发',
            disabled: true
        })
        var Interval = setInterval(function () {
            time--;
            if (time > 0) {
                that.setData({
                    getcode: time + '秒后重发'
                })
            } else {
                clearInterval(Interval);
                that.setData({
                    getcode: '获取验证码',
                    disabled: false
                })
            }
        }, 1000)
    },

    login() {
        let uid = wx.getStorageSync('uid');
        let baseUrl = wx.getStorageSync('url');
        // let m = app.globalData.sessionid;
        // let header;
        // header = {
        //     'sessionid': m
        // };
        let vfcode = this.data.code;
        if (vfcode == ''){
            alert('请输入验证码！');
            return false;
        }
        let phonenum = this.data.phone;
        if (phonenum == '') {
            alert('请输入手机号！');
            return false;
        } else {
            wx.request({
                url: baseUrl + '/',
                method: 'get',
                header: header,
                data:{
                    uid: uid,
                    phone: phonenum,
                    vfcode: vfcode
                },
                success(data) {
                    debugger;
                },
                fail(data) {
                    alert(data.error);
                }
            })

        }
    }
    
})