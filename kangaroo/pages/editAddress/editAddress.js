// pages/addAddress/addAddress.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        selected: false,
        aname: '',
        phone: '',
        region: '',
        address_info: '',
        address_status: '',
        id: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let id = options.id;
        this.setData({
            id: id
        })
        this.getAddressList(id);
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

    sele() {
        let address_status = this.data.address_status;
        let status = '';
        if (address_status == 1){
            status = '0';
        } else {
            status = '1';
        }
        this.setData({
            address_status: status
        })
    },

    aname(e) {
        this.setData({
            aname: e.detail.value
        })
    },
    phone(e) {
        this.setData({
            phone: e.detail.value
        })
    },

    address_info(e) {
        this.setData({
            address_info: e.detail.value
        })
    },

    // 选择省市区函数
    changeRegin(e) {
        this.setData({ region: e.detail.value });
    },

    save() {
        let id = this.data.id;
        let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        let aname = this.data.aname;
        let phone = this.data.phone;
        let sele = this.data.sele;
        let region = this.data.region;
        let addDetail = this.data.address_info;
        if (aname == '') {
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
        if (sele == true) {
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
                id: id,
                uid: uid,
                action: 'edit',
                address_status: address_status
            },
            success(res) {
                if (res.data.code == 1) {
                    wx.navigateTo({
                        url: '/pages/manaAddress/manaAddress',
                    })
                }
            },
            fail(err) {
                alert(err.errMsg);
            }
        })
    },

    getAddressList(id) {
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
                    for (let i = 0; i < m.length; i++) {
                        if(id == m[i].id){                          
                            let add = m[i].address.slice(1, m[i].address.length - 1);
                            let arr = add.split(",");
                            that.setData({
                                aname: m[i].name,
                                phone: m[i].phone,
                                region: arr,
                                address_info: m[i].address_info,
                                address_status: m[i].address_status
                            })
                        }
                    }
                    
                }
            },
            fail(err) {
                alert(err.errMsg);
            }
        })
    },
})