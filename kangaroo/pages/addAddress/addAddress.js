// pages/addAddress/addAddress.js
import {
    alert
} from "../utils/core.js"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        selected: false,
        addDetail: '',
        sele: '',
        phone: '',
        aname: '',
        region: ["北京市", "北京市", "东城区"],
        orders_number: ''
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
    aname(e){
        this.setData({
            aname: e.detail.value
        })
    },
    phone(e) {
        this.setData({
            phone: e.detail.value
        })
    },
    detail(e) {
        this.setData({
            addDetail: e.detail.value
        })
    },
    sele(){
        const selected = this.data.selected;
        let sele = !selected;
        this.setData({
            selected: sele
        })
    },

    save(){
        let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        let aname = this.data.aname;
        let phone = this.data.phone;
        let sele = this.data.sele;
        let region = this.data.region;
        let addDetail = this.data.addDetail;
        let that = this;
        //let str = region.join(",");
        if(aname == ''){
            alert('请输入收货人姓名！');
            return false;
        }

        if (phone == '' || !myreg.test(phone)) {
            alert('请输入正确的手机号码！');
            return false;
        }

        if (addDetail == '') {
            alert('请输入详细地址！');
            return false;
        }
        let address_status = '';
        if(sele == true){
            address_status = '0';
        } else {
            address_status = '1'
        }
        let baseUrl = wx.getStorageSync('url');
        let uid = wx.getStorageSync('uid');
        wx.request({
            url: baseUrl + '/getaddress',
            method: 'get',
            data: {
                name: aname,
                phone: phone,
                address: region,
                address_info: addDetail,
                uid: uid,
                action: 'add',
                address_status: address_status
            },
            success(res){
                if(res.data.code == 1){
                    let orders_number = that.data.orders_number;
                    debugger;
                    if (orders_number != undefined){
                        wx.navigateTo({
                            url: '/pages/confirmation/confirmation?orders_number=' + orders_number,
                        })
                    } else {
                        wx.navigateTo({
                            url: '/pages/manaAddress/manaAddress',
                        })
                    }
                    
                }
            },
            fail(err){
                alert(err.errMsg);
            }
        })        
    },

   
    // 选择省市区函数
    changeRegin(e) {
        this.setData({ region: e.detail.value });
    }
})