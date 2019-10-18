'use strict';
import timeago from './timeago.min'
import dateFormat from './dateformat'
import distance from './distance'
import QQMapWX from './qqmap-wx-jssdk.min'
import {
  gcj02tobd09
} from './coordtransform'
import {
  host,
  qqmapKey
} from '../config'

const qqmap = new QQMapWX({
  key: qqmapKey
});

function resolveAdInfo(adInfo) {
  const {
    // adcode
  } = adInfo
  return {
      adInfo
    // district_id: adcode,
    // city_id: adcode.replace(/\d{2}$/, '00')
  }
}

// 解析地址
export function reverseGeocoder(options) {
  const {
    location,
    success,
    complete
  } = options
  qqmap.reverseGeocoder({
    location,
    success: function (res) {
        var adress = resolveAdInfo(res.result.address)
        success && success(adress)
    },
    fail: function (err) {
      console.log(err)
    },
    complete
  })
}

//根据坐标获取经纬度
export function getjingwei(options){
    const {
        address,
        success,
        complete
    } = options
    qqmap.geocoder({
        address,
        success: function(res){
            success && success(res.result)
        },
        fail: function (err) {
            console.log(err)
        },
        complete
        
    })
}

// 获取当前地理位置
export function getCurrentAddressList(options) {
  const {
    success,
    complete
  } = options
  wx.getLocation({
    type: 'gcj02',
    success(res) {
      getAddressFromLocation({
        location: {
          latitude: res.latitude,
          longitude: res.longitude,
        },
        success,
        complete
      })
    },
    fail(res) {
      //console.log(res.errMsg)
      alert('获取用户地址失败')
    }
  })
}

// 地点搜索
export function searchAddressList(options) {
  const {
    keyword,
    success
  } = options
  getCurrentCity(function (cityName) {
    qqmap.getSuggestion({
      region: cityName,
      keyword,
      success(res) {
        success && success(res.data)
      }
    })
  })
}

// 获取当前地址
export function getCurrentAddress(callback) {
  getCurrentAddressList({
    success(addressList) {
      if (addressList.length > 0) {
        callback(addressList[0])
      }
    }
  })
}


// 获取当前城市
var cityName;
export function getCurrentCity(callback) {
  if (cityName) {
    return callback && callback(cityName)
  }
  wx.getLocation({
    type: 'gcj02',
    success(res) {
      qqmap.reverseGeocoder({
        location: {
          longitude: res.longitude,
          latitude: res.latitude
        },
        success: function (res) {
          cityName = res.result.address_component.city
          callback && callback(cityName)
        }
      })
    },
    fail(res) {
      //console.log(res.errMsg)
      alert('获取用户地址失败')
    }
  })
}


// 根据坐标获取地址信息
export function getAddressFromLocation(options) {
  const {
    location,
    success
  } = options
  getPois({
    location,
    success(pois) {
      var addressList = []
      pois.forEach(poi => {
        var {
          title,
          location,
          adress,
          ad_info
        } = poi
        addressList.push(Object.assign({
          title,
          location,
          adress
        }, resolveAdInfo(ad_info)))
      })
      success && success(addressList)
    }
  })
}

// 获取兴趣点
export function getPois(options) {
  const {
    location,
    success,
    complete
  } = options
  qqmap.reverseGeocoder({
    location,
    get_poi: 1,
    success: function (res) {
      success && success(res.result.pois)
    },
    fail: function (err) {
      console.log(err)
    },
    complete
  })
}

export function getPrevPage() {
  const pages = getCurrentPages()
  return pages[pages.length - 2]
}
export function getCurrentPage() {
  const pages = getCurrentPages()
  return pages[pages.length - 1]
}

export function fetch(options) {
  wx.request({
    url: `https://${host}/${options.url}`,
    data: Object.assign(options.data, {
      'app_v': 'meixi-app'
    }),
    method: options.method || 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      const data = res.data
      if (data.status == '1') {
        options.success && options.success(data.data)
      } else {
        //如果没有登陆，默认弹出提示要求登陆，这里禁用掉了提示
        options.error && options.error(data)
      }
      options.complete && options.complete()
    }
  })
}
export function toast(content, callback) {
  wx.showToast({
    title: content,
    //图标，支持"success"、"loading"  
    icon: 'success', 
     //自定义图标的本地路径，image 的优先级高于 icon  
    //image: '../image/img.png',
    //提示的延迟时间，单位毫秒，默认：1500  
    duration: 2000, 
    //是否显示透明蒙层，防止触摸穿透，默认：false  
    mask: true, 
    //接口调用成功的回调函数
    success: function () {
      callback && callback();
    },
    //接口调用失败的回调函数  
    fail: function () {},
    //接口调用结束的回调函数  
    complete: function () {}
  })

};

export function modalcnt(options) {
    var {
        content,
        confirmText,
        ok
    } = options
    confirmText = '确定'
    wx.showModal({
        content,
        success(res) {
            if (res.confirm) {
                ok && ok()
            }
        }
    })
}
// 提示框
export function alert(content, callback) {
  wx.showModal({
    title: '提示',
    content: content,
    showCancel: false,
    success: callback
  })
}
// 确认框
export function confirm(options) {
  var {
    content,
    confirmText,
    ok,
    no,
  } = options
  confirmText = confirmText || '确定'
  wx.showModal({
    content,
    confirmText,
    cancelText: '关闭',
    success(res) {
      if (res.confirm) {
        ok && ok()
      } else {
        no && no()
      }
    }
  })
}

// 拨打电话
export function makePhoneCall(phoneNum) {
  confirm({
    content: `是否拨打电话 ${phoneNum}`,
    confirmText: '拨打',
    ok() {
      wx.makePhoneCall({
        phoneNumber: phoneNum,
      })
    }
  })
}

// 加载提示
export function showLoading() {
  wx.showToast({
    icon: 'loading',
    duration: 1000,
    title: '加载中...',
    mask: true,
  })
}
export function hideLoading() {
  wx.hideToast()
}

// 时间格式化
export function datetimeFormat(unix_timestamp) {
  return dateFormat(new Date(unix_timestamp * 1000), "mm月dd日 HH:MM")
}

// 坐标格式化
export function coordFormat(location) {
  if (location.lat && location.lng) {
    location = {
      longitude: location.lng,
      latitude: location.lat
    }
  }
  // gcj02 转 bd09
  var location = gcj02tobd09(location.longitude, location.latitude)
  return {
    longitude: location[0],
    latitude: location[1]
  }
}

// 倒计时格式化
export function countdownFormat(count) {
  var seconds = count % 60
  count = Math.floor(count / 60)
  var minutes = count % 60
  return `${minutes}分钟${seconds}秒`
}

// 字符串关键字分组

export function splitByKeyword(text, keyword) {
  if (!text) {
    return []
  }
  var arr = text.split(keyword)
  var res = []
  res.push({
    text: arr[0],
    isKeyword: false
  })
  for (let i = 1, len = arr.length; i < len; i++) {
    res.push({
      text: keyword,
      isKeyword: true
    }, {
      text: arr[i],
      isKeyword: false
    })
  }
  return res
}

var userInfo
export function getUserInfo(cb) {
  if (userInfo) {
    return cb(userInfo)
  } else {
    wx.getUserInfo({
      success(res) {
        userInfo = res.userInfo
        cb(userInfo)
      },
      fail(res) {
        //console.log(res)
        alert('获取用户信息失败')
      }
    })
  }
}

// 微信支付
export function requestPayment(options) {
  var {
    data,
    success,
    error,
    complete
  } = options
  wx.requestPayment(Object.assign({
    complete(res) {
      if (res.errMsg == 'requestPayment:ok') {
        alert('支付成功', function () {
          success && success()
          complete && complete()
        })
      } else if (res.errMsg == 'requestPayment:fail cancel') {
        alert('用户取消支付', function () {
          error && error()
          complete && complete()
        })
      } else {
        alert('支付失败', function () {
          error && error()
          complete && complete()
        })
      }
    }
  }, data))
}

// 分享
export function share(options) {
  if (!wx.showShareMenu) {
    return alert('当前微信版本过低, 无法使用该功能, 请升级到最新微信版本后重试.')
  }

  wx.showShareMenu(options)
}
//富文本解析
export function convertHtmlToText(inputText) {
  var returnText = "" + inputText;
  returnText = returnText.replace(/<\/div>/ig, '\r\n');
  returnText = returnText.replace(/<\/li>/ig, '\r\n');
  returnText = returnText.replace(/<li>/ig, ' * ');
  returnText = returnText.replace(/<\/ul>/ig, '\r\n');
  //-- remove BR tags and replace them with line break
  returnText = returnText.replace(/<br\s*[\/]?>/gi, "\r\n");

  //-- remove P and A tags but preserve what's inside of them
  returnText = returnText.replace(/<p.*?>/gi, "\r\n");
  returnText = returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");

  //-- remove all inside SCRIPT and STYLE tags
  returnText = returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
  returnText = returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
  //-- remove all else
  returnText = returnText.replace(/<(?:.|\s)*?>/g, "");

  //-- get rid of more than 2 multiple line breaks:
  returnText = returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\r\n\r\n");

  //-- get rid of more than 2 spaces:
  returnText = returnText.replace(/ +(?= )/g, '');

  //-- get rid of html-encoded characters:
  returnText = returnText.replace(/ /gi, " ");
  returnText = returnText.replace(/&/gi, "&");
  returnText = returnText.replace(/"/gi, '"');
  returnText = returnText.replace(/</gi, '<');
  returnText = returnText.replace(/>/gi, '>');

  return returnText.replace(/(^\s*)|(\s*$)/g,"");
}