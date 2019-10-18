//util.js  
function throttle(fn, gapTime) {
    if (gapTime == null || gapTime == undefined) {
        gapTime = 1500
    }
    let _lastTime = null
    return function () {
        let _nowTime = + new Date()
        if (_nowTime - _lastTime > gapTime || !_lastTime) {
            // 将this和参数传给原函数
            fn.apply(this, arguments)
            _lastTime = _nowTime
        }
    }
}
function imageUtil(e) {
  var imageSize = {};
  var originalWidth = e.detail.width;//图片原始宽  
  var originalHeight = e.detail.height;//图片原始高  
  var originalScale = originalHeight / originalWidth;//图片高宽比  
 // console.log('originalWidth: ' + originalWidth)
 // console.log('originalHeight: ' + originalHeight)
  //获取屏幕宽高  
  wx.getSystemInfo({
    success: function (res) {
      var windowWidth = res.windowWidth;
      var windowHeight = res.windowHeight;
      var windowscale = windowHeight / windowWidth;//屏幕高宽比  
    //  console.log('windowWidth: ' + windowWidth)
    //  console.log('windowHeight: ' + windowHeight)
      if (originalScale < windowscale) {//图片高宽比小于屏幕高宽比  
        //图片缩放后的宽为屏幕宽  
        imageSize.imageWidth = windowWidth;
        imageSize.imageHeight = (windowWidth * originalHeight) / originalWidth;
      } else {//图片高宽比大于屏幕高宽比  
        //图片缩放后的高为屏幕高  
        imageSize.imageHeight = windowHeight;
        imageSize.imageWidth = (windowHeight * originalWidth) / originalHeight;
      }

    }
  })
 // console.log('缩放后的宽: ' + imageSize.imageWidth)
 // console.log('缩放后的高: ' + imageSize.imageHeight)
  return imageSize;
}

//防止连续点击事件
function buttonClicked(self) {
    self.setData({
        buttonClicked: true
    })
    setTimeout(function () {
        self.setData({
            buttonClicked: false
        })
    }, 500)
}

module.exports = {
    buttonClicked: buttonClicked,
    imageUtil: imageUtil,
    throttle: throttle
}  