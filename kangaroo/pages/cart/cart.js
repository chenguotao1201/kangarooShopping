// pages/cart/cart.js
import {
    alert,
    confirm
} from '../utils/core.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        seleBox: [],
        index: 0,
        selectedAll: true, //默认全选
        cart: [],
        discount: '0', //优惠券折扣
        delivery: '0', //配送费
        totalPrice: '0', //总价
        arrid: []
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
        this.getList();
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

    //单选
    sele(e){
        let seleBox = this.data.seleBox;
        const index = e.currentTarget.dataset.index;
        let cart = this.data.cart;
        let arrid = [];
        const selected = cart[index].selected;
        cart[index].selected = !selected;
        let selectBox = 0;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].selected) {
                arrid.push(cart[i].id);
                ++selectBox;
            }
        }
        this.getTotalPrice();
        this.setData({
            cart: cart,
            arrid: arrid,
            selectedAll: selectBox === cart.length ? true : false
        })
    },

    //全选
    selected(){
        var selectedAll = !this.data.selectedAll;
        var cart = this.data.cart;
        let arrid = [];
        if (selectedAll == true){
            for(var i = 0; i < cart.length; i++){
                cart[i].selected = true;
                arrid.push(cart[i].id);
            }
        } else {
            for (var i = 0; i < cart.length; i++) {
                cart[i].selected = false;
            }
        }
        
        this.setData({
            selectedAll: selectedAll,
            cart: cart,
            arrid: arrid
        })
        this.getTotalPrice();
    },

    //计算总价
    getTotalPrice(){
        let cart = this.data.cart;
        var totalPrice = 0;
        for(let i = 0; i < cart.length; i++){
            if(cart[i].selected == true){
                totalPrice += parseInt(cart[i].number) * parseInt(cart[i].discount_price);        
            }
        }

        this.setData({
            totalPrice: totalPrice
        })
    },

    //加法
    add(e){
        let id = e.currentTarget.dataset.id;
        let cart = this.data.cart;
        for(let i = 0; i < cart.length; i++){
            if(id == cart[i].id){
                cart[i].number++;
                this.edit(id, cart[i].number);
            }
        }
        this.getTotalPrice();
        this.setData({
            cart: cart
        })
    },

    //减法
    min(e){
        let id = e.currentTarget.dataset.id;
        let cart = this.data.cart;
        for (let i = 0; i < cart.length; i++) {
            if (id == cart[i].id) {
                if(cart[i].number > 1){
                    cart[i].number--;
                    this.edit(id, cart[i].number);
                } else {
                    alert('不能在减了！')
                }               
            }
        }
        
        this.getTotalPrice();
        this.setData({
            cart: cart
        })
    },

    //提交生成订单
    goConfirmation(){
        let arrid = this.data.arrid;
        let total = this.data.totalPrice;
        let uid = wx.getStorageSync('uid');
        let baseurl = wx.getStorageSync('url');
        let cart = this.data.cart;
        if(cart.length == 0){
            alert('该购物车还没有商品哦！');
            return false;
        }
        if (arrid.length == 0){
            alert('请在选择商品后在提交订单！')
            return false;
        }
        wx.request({
            url: baseurl + '/getorders',
            data: {
                action: 'add',
                ids: arrid
            },
            method: 'get',
            success(res){
                if(res.data.code == 1){
                    let orders_number = res.data.orders_num;
                    wx.navigateTo({
                        url: '/pages/confirmation/confirmation?orders_number=' + orders_number,
                    })
                } else {
                    alert(res.data.errMsg);
                }
            },
            fail(err){
                alert(err.errMsg);
            }
        })
        
    },

    //删除购物车商品
    delete(){
        let that = this;
        let arrid = this.data.arrid;
        let baseurl = wx.getStorageSync('url');
        let uid = wx.getStorageSync('uid');
        let data = JSON.stringify(arrid)
        wx.request({
            url: baseurl + '/getshopcar',
            method: 'get',
            data: {
                id: data,
                action: 'del'
            },
            success(res){
                if(res.data.code == 1){
                    wx.showToast({
                        title: '删除成功',
                        icon: 'success',
                        duration: 2000
                    })
                    that.getList();
                }
            },
            fail(err){
                alert(err.errMsg);
            }
        })
    },

    //编辑购物车
    edit(id, count){
        let baseurl = wx.getStorageSync('url');
        let that = this;
        wx.request({
            url: baseurl + '/getshopcar',
            method: 'get',
            data: {
                number: count,
                id: id,
                action: 'edit'
            },
            success(res){
                that.getList();
            },
            fail(err){
                alert(err.errMsg);
            }
        })
    },

    //获取购物车列表
    getList(){
        wx.showLoading({ title: '加载中', icon: 'loading', duration: 3000 });
        let that = this;
        let uid = wx.getStorageSync('uid');
        let baseUrl = wx.getStorageSync('url');
        wx.request({
            url: baseUrl + '/getshopcar',
            method: 'get',
            data: {
                uid: uid
            },
            success(res){
                if (res.data.code == 1) {
                    let m = res.data.data;
                    let arrid = [];
                    for (let i = 0; i < m.length; i++) {
                        m[i].pic = baseUrl + m[i].pic;
                        m[i].selected = true
                        if (m[i].selected == true) {
                            arrid.push(m[i].id)
                        }
                    }
                    that.setData({
                        cart: m,
                        arrid: arrid
                    })
                    that.getTotalPrice();
                } else if(res.data.data == null){
                    that.setData({
                        cart: [],
                        arrid: []
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

    gogoods(){
        wx.navigateTo({
            url: '/pages/classification/classification',
        })
    }
})