// pages/classification/classification.js
import {
    alert,
    comfirm,
    toast
} from "../utils/core.js"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchValue: '',
        navLeftItems: [],
        navRightItems: [],
        curNav: 1,
        curIndex: 0,
        list: []  
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 加载的使用进行网络访问，把需要的数据设置到data数据对象  
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

    //事件处理函数  
    switchRightTab: function (e) {
        // 获取item项的id，和数组的下标值  
        let id = e.target.dataset.id,
            index = parseInt(e.target.dataset.index);
        // 把点击到的某一项，设为当前index  
        this.setData({
            curNav: id,
            curIndex: index
        })
    },

    //获取搜索内容
    bindinput(e){
        var searchValue = e.detail.value;
        this.setData({
            searchValue: searchValue
        })
    },

    //搜索
    bindconfirm: function (e) {

        let that = this;
        let discountName = e.detail.value['search - input'] ? e.detail.value['search - input'] : e.detail.value
        let baseUrl = wx.getStorageSync('url');
        wx.request({
            url: baseUrl + '/gettype',
            method: 'get',
            data:{
                gname: discountName
            },
            header: {
                'Accept': 'application/json'
            },
            success: function (res) {
                const list = res.data;
                //debugger;
                for(let i = 0; i < list.length; i++){
                    list[i].pic = baseUrl + list[i].pic;
                }
                that.setData({
                    list: list
                })
            }
        })  
        console.log('e.detail.value', discountName)
    }, 

    //添加购物车
    add(e){
        let baseUrl = wx.getStorageSync('url');
        let uid = wx.getStorageSync('uid');
        let id = e.currentTarget.dataset.id;
        wx.request({
            url: baseUrl + '/getshopcar',
            data: {
                uid: uid,
                goods_id: id,
                action: 'add'
            },
            method: 'get',
            success(res){
                if(res.data.code == 1){
                    wx.showToast({
                        title: '添加成功',
                        icon: 'success',
                        duration: 500
                    })
                } else {
                    alert(res.data.msg);
                }
            },
            fail(err){
                alert(err.errMsg);
            }
        })
    },

    //跳转购物车
    gocart(){
        wx.switchTab({
            url: '/pages/cart/cart',
        })
    },

    //商品详情
    goDetail(e){
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/commodity/commodity?id=' + id,
        })
    },

    //获取页面数据
    getList(){
        wx.showLoading({ title: '加载中', icon: 'loading', duration: 3000 });
        let that = this;
        let baseUrl = wx.getStorageSync('url');
        wx.request({
            url: baseUrl + '/gettype',
            method: 'get',
            header: {
                'Accept': 'application/json'
            },
            success: function (res) {
                let type = res.data.type;
                let goods = res.data.goods;
                for (let i = 0; i < goods.length; i++) {
                    goods[i].type_pic = baseUrl + goods[i].type_pic;
                    if (goods[i].data != null) {
                        for (let j = 0; j < goods[i].data.length; j++) {
                            goods[i].data[j].pic = baseUrl + goods[i].data[j].pic;
                        }
                    } else {
                        //alert('暂时没有数据！')
                    }

                }
                that.setData({
                    navLeftItems: type,
                    navRightItems: goods
                })
            },

            fail: (err) => {
                alert(err.errMsg);
            },
            complete: () => {
                wx.hideLoading()
            }
        })  
    }
})