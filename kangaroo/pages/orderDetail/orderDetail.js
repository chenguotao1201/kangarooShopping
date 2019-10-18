// pages/orderDetail/orderDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        status: 1,
        countDownNum: '100',
        name: '包子',
        phone: '18888888888',
        address: '山东省威海市高区盛德丽景名都北门杂货铺',
        list: [{ url: '../../image/1.jpg', con: '法律界奥利弗的减少浪费了多久了房间拉斯', unitPrice: '298.00', count: '1' }, { url: '../../image/1.jpg', con: '法律界奥利弗的减少浪费了多久了房间拉斯', unitPrice: '298.00', count: '1' }],
        zjia: '598.00',
        freight: '包邮',
        coupon: '0.00',
        orderNum: '12323243232132',
        creatTime: '2019-10-10 18:34:23'

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.countDown();
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

    countDown: function () {
        let that = this;
        let countDownNum = that.data.countDownNum;//获取倒计时初始值
        //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面
        that.setData({
            timer: setInterval(function () {//这里把setInterval赋值给变量名为timer的变量
                //每隔一秒countDownNum就减一，实现同步
                countDownNum--;
                //然后把countDownNum存进data，好让用户知道时间在倒计着
                that.setData({
                    countDownNum: countDownNum
                })
                //在倒计时还未到0时，这中间可以做其他的事情，按项目需求来
                if (countDownNum == 0) {
                    //这里特别要注意，计时器是始终一直在走的，如果你的时间为0，那么就要关掉定时器！不然相当耗性能
                    //因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭
                    clearInterval(that.data.timer);
                    //关闭定时器之后，可作其他处理codes go here
                }
            }, 1000)
        })
    }

})