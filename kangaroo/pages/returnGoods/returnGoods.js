// pages/returnGoods/returnGoods.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [{ url: '../../image/1.jpg', con: '法律界奥利弗的减少浪费了多久了房间拉斯', unitPrice: '298.00', count: '1' }, { url: '../../image/1.jpg', con: '法律界奥利弗的减少浪费了多久了房间拉斯', unitPrice: '298.00', count: '1' }],
        return_money: '128.00',
        explain: '',
        selectArray: [{ "id": "10", "value": "会计类" }, {
            "id": "21", "text": "工程类"
        }, '技术类', { 'id': '22', 'value': '其他' }],
        arrImg: []
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

    select(e) {
        console.log(e.detail)
    },

    upload: function () {
        let that = this;
        let arrImg = this.data.arrImg;
        if (arrImg > 3){
            return false;
        }
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: res => {
                wx.showToast({
                    title: '正在上传...',
                    icon: 'loading',
                    mask: true,
                    duration: 1000
                })
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                // let tempFilePaths = res.tempFilePaths;
                arrImg.push(res.tempFilePaths);
                that.setData({
                    arrImg: arrImg
                })
                /**
                 * 上传完成后把文件上传到服务器
                 */
                // var count = 0;
                for (var i = 0, h = tempFilePaths.length; i < h; i++) {
                    //上传文件
                    wx.uploadFile({
                        url: 'https://xcx.lulianiot.com/weChat/uploadImage',
                        filePath: tempFilePaths[i],
                        name: 'file',
                        header: {
                            "Content-Type": "multipart/form-data"
                        },
                        success: function (res) {
                            let m = JSON.parse(res.data);
                            let licensePhoto = m.licensePhoto;
                            if (licensePhoto) {
                                wx.request({
                                    url: 'https://xcx.lulianiot.com/getUrl?objectName=' + licensePhoto,
                                    method: 'get',
                                    header: header,
                                    success(data) {
                                        
                                    },
                                    fail(data) {
                                        alert(data.errMsg);
                                    }
                                })
                            }

                            wx.setStorageSync('key', licensePhoto);
                            that.setData({
                                licensePhoto: licensePhoto
                            })
                            //   count++;
                            //如果是最后一张,则隐藏等待中  
                            //   if (count == tempFilePaths.length) {
                            //     wx.hideToast();
                            //   }
                        },
                        fail: function (res) {
                            wx.hideToast();
                            wx.showModal({
                                title: '错误提示',
                                content: '上传图片失败',
                                showCancel: false,
                                success: function (res) { }
                            })
                        }
                    });
                }

            }
        })
    }
})