import {
  fetch,
  coordFormat,
  alert,
  confirm,
} from './core'

// 获取商店列表
export function getSellers(options) {
  var {
    page,
    success
  } = options
  page = page || 0
  getApp().getCurrentAddress(address => {
    var location = address.location
    fetch({
      url: 'index.php?m=Mall&c=Seller&a=getSellers',
      data: {
        page,
        city_name: address.city,
        city_id: address.city_id,
        district_name: address.district,
        district_id: address.district_id,
        longitude: location.longitude,
        latitude: location.latitude
      },
      success
    })
  })
}

// 保存门店信息
export function merchantreg(options) {
    const {
        name,
        owner,
        businessContent,
        storeArea,
        province,
        longitude,
        latitude,
        createTime,
        updateTime,
        installerld,
        businessScope,
        street,
        uuid,
        id,
        success,
        error
    } = options
    debugger;
    // getApp().getLoginInfo(loginInfo => {
    //     if (!loginInfo.user_info) {
    //         return alert('用户未登录')
    //     }
        //var {
        //     uid
        // } = loginInfo
        // var gps = adress.gps
        // if (!gps) {
        //   var location = coordFormat(adress.location)
        //   gps = `${location.longitude},${location.latitude}`
        // }

        fetch({
            url: 'uploadShop',
            data: {
                name,
                owner,
                businessContent,
                storeArea,
                province,
                longitude,
                latitude,
                createTime,
                updateTime,
                installerld,
                businessScope,
                street,
                uuid,
                id,
            },
            success,
            error
        })

    // })
}

// 保存门店信息
export function merchantreg11(options) {
  var {
    seller_id,
    success,
    complete
  } = options
  getApp().getCurrentAddress(address => {
    var location = address.location
    fetch({
      url: 'index.php?m=Mall&c=Seller&a=getSellerInfo',
      data: {
        seller_id,
        longitude: location.longitude,
        latitude: location.latitude
      },
      success,
      complete
    })
  })
}

// 获取商店评论
export function getReviews(options) {
  var {
    seller_id,
    page,
    success
  } = options
  page = page || 0
  fetch({
    url: 'index.php?m=Mall&c=Seller&a=getReviews',
    data: {
      seller_id,
      page
    },
    success
  })
}

// 短信验证码
export function getCode(options) {
  const {
    phonenum,
    success,
    error
  } = options
  fetch({
      url: "https://xcx.lulianiot.com/sms?phonenum=" + phonenum,
    data: {
        phonenum,
      key: ''
    },
    success,
    error
  })
}

//登录
export function login(options) {
  const {
    phone,
    pwd,
    remember,
    success,
    error
  } = options
  wx.login({
    success(res) {
      fetch({
        url: '/meixi/public/index.php/api/login/dologin',
        data: {
          phone,
          pwd,
          remember,
          wx_code: res['code'],
          session_3rd: wx.getStorageSync('session_3rd')
        },
        success,
        error
      })
    },
    error(res) {
      alert(res['errMsg'])
      error && error(res['errMsg'])
    }
  })

}

//注册
export function userRegister(options) {

  let _channel = options.channel,
    uris = {
      "reg": "/meixi/public/index.php/api/login/register",
      "find": "/meixi/public/index.php/api/login/retpwd"
    };

  const {
    phone,
    pwd,
    tj,
    code,
    success,
    error
  } = options
  wx.login({
    success(res) {
      fetch({
        url: uris[_channel],
        data: {
          phone,
          pwd,
          tj,
          code
        },
        success,
        error
      })
    },
    error(res) {
      error && error(res['msg'])
    }
  })

}
// 退出账号
export function logout(options) {
  const {
    success,
    error
  } = options
  fetch({
    url: 'meixi/public/index.php/api/login/logout',
    data: {},
    success,
    error
  })
}

// 获取登录信息
export function getLoginInfo(options) {
  const {
    success,
    error
  } = options
  wx.login({
    success(res) {
      //console.log("=======获取当前用户登录状态的接口==========");
      //console.log(res);
      fetch({
        url: '/meixi/public/index.php/api/login/keep',
        data: {
          wx_code: res['code'],
          session_3rd: wx.getStorageSync('session_3rd')
        },
        success,
        error
      })
    },
    error(res) {
      alert(res['errMsg'])
      error && error(res['errMsg'])
    }
  })
}

//获取自提地址getZiti 
export function getZiti(options) {
  const {
    success,
    error
  } = options

  getApp().getLoginInfo(loginInfo => {

    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }

    fetch({
      url: '/meixi/public/index.php/api/shopcart/getZiti',
      data: {
      },
      success,
      error
    })

  })
}

// 获取用户地址列表
export function getUserAddrs(options) {
  const {
    success,
    error
  } = options

  getApp().getLoginInfo(loginInfo => {

    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }
    var {
      uid
    } = loginInfo
    fetch({
      url: '/meixi/public/index.php/api/user/adress',
      data: {
        uid
      },
      success,
      error
    })

  })
}
// 获取用户地址
export function getUserAddr(options) {
  const {
    id,
    success,
    error
  } = options

  getApp().getLoginInfo(loginInfo => {
    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }
    var {
      uid
    } = loginInfo
    fetch({
      url: '/meixi/public/index.php/api/user/getadress',
      data: {
        uid,
        id
      },
      success,
      error
    })

  })
}



// 修改地址
export function updateUserAddr(options) {
  //console.log("修改地址");
  //console.log(options);
  const {
    id,
    uname,
    phone,
    door,
    title,
    type,
    gps,
    city_id,
    city,
    district_id,
    district_name,
    adress,
    success,
    error
  } = options
  getApp().getLoginInfo(loginInfo => {
    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }
    var {
      uid
    } = loginInfo
    // var gps = adress.gps

    // if (!gps) {
    //   var location = coordFormat(adress.location)
    //   gps = `${location.longitude},${location.latitude}`
    // }
    fetch({
      url: '/meixi/public/index.php/api/user/editadress',
      data: {
        id,
        uid,
        uname,
        phone,
        door,
        gps,
        type,
        adress,
        title,
        city_id,
        city,
        district_id,
        district_name
      },
      success,
      error
    })

  })
}

// 删除地址
export function deleteUserAddr(options) {
  const {
    id,
    success,
    error
  } = options
  getApp().getLoginInfo(loginInfo => {
    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }
    var {
      uid
    } = loginInfo
    fetch({
      url: '/meixi/public/index.php/api/user/deladress',
      data: {
        uid,
        id
      },
      success,
      error
    })

  })
}

// 设置默认地址
export function setStatusAddr(options) {
  const {
    id,
    success,
    error
  } = options
  getApp().getLoginInfo(loginInfo => {
    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }
    var {
      uid
    } = loginInfo
    fetch({
      url: '/meixi/public/index.php/api/user/setstatus',
      data: {
        uid,
        id
      },
      success,
      error
    })

  })
}

// 购物车下单
export function addQuasiOrder(options) {
  const {
    id,
    aid,
    ziti_time,
    ziti_duan,
    ziti_phone,
    ziti_name,
    is_ziti,
    is_ziyong,
    remark,
    success,
    error
  } = options

  getApp().getLoginInfo(loginInfo => {
    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }
    var {
      uid
    } = loginInfo
    fetch({
      url: 'meixi/public/index.php/api/shopcart/order',
      data: {
        id,
        uid,
        aid,
        ziti_time,
        ziti_duan,
        ziti_phone,
        ziti_name,
        remark,
        is_ziti,
        is_ziyong,
      },
      success,
      error
    })

  })

}

// 获取准订单
export function getQuasiOrderInfo(options) {
  var {
    quasi_order_id,
    success,
    error
  } = options
  getApp().getLoginInfo(loginInfo => {
    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }
    var {
      user_id,
      user_token
    } = loginInfo.user_info
    fetch({
      url: 'index.php?m=Mall&c=Order&a=getQuasiOrderInfo',
      data: {
        user_id,
        user_token,
        quasi_order_id
      },
      success,
      error
    })

  })
}

// 更新准订单地址
export function updateOrderAddr(options) {
  var {
    quasi_order_id,
    addr_id,
    success,
    error
  } = options
  getApp().getLoginInfo(loginInfo => {
    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }
    var {
      user_id,
      user_token
    } = loginInfo.user_info
    fetch({
      url: 'index.php?m=Mall&c=Order&a=updateOrderAddr',
      data: {
        user_id,
        user_token,
        quasi_order_id,
        addr_id
      },
      success,
      error
    })

  })
}
// 更新准订单红包
export function updateOrderCoupon(options) {
  var {
    quasi_order_id,
    user_coupon_id,
    success,
    error
  } = options
  getApp().getLoginInfo(loginInfo => {
    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }
    var {
      user_id,
      user_token
    } = loginInfo.user_info
    fetch({
      url: 'index.php?m=Mall&c=Order&a=updateOrderCoupon',
      data: {
        user_id,
        user_token,
        quasi_order_id,
        user_coupon_id
      },
      success,
      error
    })

  })
}
//购物车选中pitch
export function pitch(options) {
  var {
    id,
    type,
    success,
    error
  } = options
  getApp().getLoginInfo(loginInfo => {
    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }
    var {
      uid
    } = loginInfo
    fetch({
      url: 'meixi/public/index.php/api/shopcart/pitch',
      data: {
        uid,
        id,
        type
      },
      success,
      error
    })

  })
}

// 详情添加到购物车
export function addShoppingCart(options) {
  var {
    pid,
    num,
    success,
    error
  } = options
  getApp().getLoginInfo(loginInfo => {
    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }
    var {
      uid
    } = loginInfo
    fetch({
      url: 'meixi/public/index.php/api/shopcart/addshop',
      data: {
        uid,
        pid,
        num
      },
      success,
      error
    })

  })
}

// 添加或减少购物车商品
export function shoppingHandel(options) {
  var {
    pid,
    handel,
    success,
    error
  } = options
  getApp().getLoginInfo(loginInfo => {
    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }
    var {
      uid
    } = loginInfo
    fetch({
      url: 'meixi/public/index.php/api/shopcart/handel_cart',
      data: {
        handel,
        uid,
        pid
      },
      success,
      error
    })

  })
}

// 取消订单
export function cancelOrder(options) {
  var {
    order_id,
    success,
    error
  } = options
  getApp().getLoginInfo(loginInfo => {
    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }
    var {
      user_id,
      user_token
    } = loginInfo.user_info
    fetch({
      url: 'index.php?m=Mall&c=Order&a=cancelOrder',
      data: {
        user_id,
        user_token,
        order_id
      },
      success,
      error
    })

  })
}

// 获取订单列表
export function getOrders(options) {
  var {
    page,
    success,
    error
  } = options
  getApp().getLoginInfo(loginInfo => {
    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }
    var {
      user_id,
      user_token
    } = loginInfo.user_info
    fetch({
      url: 'index.php?m=Mall&c=Order&a=getOrders',
      data: {
        user_id,
        user_token,
        page
      },
      success,
      error
    })

  })
}

// 获取订单详情
export function getOrderInfo(options) {
  var {
    order_id,
    success,
    error
  } = options
  getApp().getLoginInfo(loginInfo => {
    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }
    var {
      user_id,
      user_token
    } = loginInfo.user_info
    fetch({
      url: 'index.php?m=Mall&c=Order&a=getOrderInfo',
      data: {
        user_id,
        user_token,
        order_id
      },
      success,
      error
    })

  })
}

// 订单评论
export function reviewsOrder(options) {
  var {
    order_id,
    service,
    quality,
    content,
    reach_time,
    success,
    error
  } = options
  getApp().getLoginInfo(loginInfo => {
    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }
    var {
      user_id,
      user_token
    } = loginInfo.user_info
    fetch({
      url: 'index.php?m=Mall&c=Order&a=reviewsOrder',
      data: {
        user_id,
        user_token,
        order_id,
        service,
        quality,
        content,
        reach_time
      },
      success,
      error
    })

  })
}

// 获取支付参数
export function getPayment(options) {
  var {
    order_id,
    success,
    error
  } = options
  getApp().getLoginInfo(loginInfo => {
    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }
    //console.log(loginInfo,8848);
    var {
      user_id,
      user_token
    } = loginInfo.user_info
    fetch({
      url: 'meixi/public/index.php/api/Wxpay/smallapp',
      data: {
        user_id,
        user_token,
        order_id
      },
      success,
      error
    })

  })
}


// 获取分组列表
export function getSellersByCategory(options) {
  var {
    category_id,
    page,
    success,
    error
  } = options
  page = page || 0
  getApp().getCurrentAddress(address => {
    var {
      location,
      city_id,
      city: city_name,
      district_id,
      district: district_name
    } = address
    fetch({
      url: 'index.php?m=Mall&c=Seller&a=getSellersByCategory',
      data: {
        category_id,
        city_id,
        city_name,
        district_id,
        district_name,
        page,
        gps: `${location.longitude},${location.latitude}`,
      },
      success,
      error
    })

  })
}

// 搜索商家和商品
export function search(options) {
  var {
    keyword,
    page,
    success,
    error
  } = options
  page = page || 0
  getApp().getCurrentAddress(address => {
    var {
      location: {
        longitude,
      latitude
      },
      city_id,
      city: city_name,
      district_id,
      district: district_name
    } = address
    fetch({
      url: 'index.php?m=Mall&c=Seller&a=search',
      data: {
        keyword,
        city_id,
        city_name,
        district_id,
        district_name,
        page,
        longitude,
        latitude
      },
      success,
      error
    })

  })
}


// 获取登陆后的用户信息
export function getUserInformation(options) {
  var {
    success,
    error
  } = options;

  getApp().getLoginInfo(loginInfo => {
    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }
    var {
      uid
    } = loginInfo;
    fetch({
      url: '/meixi/public/index.php/api/user',
      data: {
        uid
      },
      success,
      error
    })

  })
}

// 获取购物车的订单列表
export function getOrderListShoppingCart(options) {
  var {
    success,
    error
  } = options;

  getApp().getLoginInfo(loginInfo => {
    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }
    var {
      uid
    } = loginInfo;
    fetch({
      url: '/meixi/public/index.php/api/shopcart',
      data: {
        uid
      },
      success,
      error
    })
  })
}

//删除购物车订单
export function delShoppingCart(options) {
  var {
    id,
    success,
    error
  } = options
  getApp().getLoginInfo(loginInfo => {
    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }
    var {
      uid
    } = loginInfo
    fetch({
      url: 'meixi/public/index.php/api/shopcart/delete',
      data: {
        uid,
        id
      },
      success,
      error
    })

  })
}

//购物车订单数量加减
export function shoppingCartsAS(options) {
  var {
    id,
    num,
    success,
    error
  } = options
  getApp().getLoginInfo(loginInfo => {
    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }
    var {
      uid
    } = loginInfo
    fetch({
      url: 'meixi/public/index.php/api/shopcart/up_cart',
      data: {
        uid,
        id,
        num
      },
      success,
      error
    })

  })
}

// 获取首页数据
export function getQueryIndexPageData(options) {
  var {
    uid,
    success,
    error
  } = options;
  fetch({
    url: 'meixi/public/index.php/api/index/index',
    data: {
      uid
    },
    success,
    error
  });
}

// 获取赠品数据
export function getGiftData(options) {
  var {
    uid,
    type,
    success,
    error
  } = options;
  fetch({
    url: '/meixi/public/index.php/api/index/getList?',
    data: {
      uid,
      type
    },
    success,
    error
  });
}

// 我的全部订单
export function myAllOrders(options) {
  var {
    success,
    error
  } = options
  getApp().getLoginInfo(loginInfo => {
    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }
    var {
      uid
    } = loginInfo
    fetch({
      url: 'meixi/public/index.php/api/order',
      data: {
        uid
      },
      success,
      error
    })

  })
}
// 我的单个状态的订单详情
export function myAllOneOrders(options) {
  var {
    status,
    success,
    error
  } = options
  getApp().getLoginInfo(loginInfo => {
    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }
    var {
      uid
    } = loginInfo
    fetch({
      url: 'meixi/public/index.php/api/order/getlist',
      data: {
        status,
        uid
      },
      success,
      error
    })

  })
}

// 我的全部订单详情
export function myAllOrdersDetails(options) {
  var {
    id,
    success,
    error
  } = options
  getApp().getLoginInfo(loginInfo => {
    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }
    var {
      uid
    } = loginInfo
    fetch({
      url: 'meixi/public/index.php/api/order/getinfo',
      data: {
        id,
        uid
      },
      success,
      error
    })

  })
}

//取消订单
export function queryCancelOrder(options) {
  const {
    id,
    success,
    error
  } = options

  getApp().getLoginInfo(loginInfo => {
    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }
    var {
      uid
    } = loginInfo
    fetch({
      url: 'meixi/public/index.php/api/order/qxorder',
      data: {
        id,
        uid
      },
      success,
      error
    })

  })

}

//删除订单
export function queryDelOrder(options) {
  const {
    id,
    success,
    error
  } = options

  getApp().getLoginInfo(loginInfo => {
    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }
    var {
      uid
    } = loginInfo
    fetch({
      url: 'meixi/public/index.php/api/order/delorder',
      data: {
        id,
        uid
      },
      success,
      error
    })

  })

}


//再次提交
export function queryArignOrder(options) {
  const {
    id,
    success,
    error
  } = options

  getApp().getLoginInfo(loginInfo => {
    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }
    var {
      uid
    } = loginInfo
    fetch({
      url: 'meixi/public/index.php/api/order/againorder',
      data: {
        id,
        uid
      },
      success,
      error
    })

  })
}

//购买服务
export function getServersInfo(options) {
  var {
    success,
    error
  } = options;
  fetch({
    url: 'meixi/public/index.php/api/card/index',
    data: {},
    success,
    error
  });
}
//验证手机号码是否注册过会员
export function checkUserPhone(options) {
  var {
    phone,
    success,
    error
  } = options;
  fetch({
    url: '/meixi/public/index.php/api/login/exist',
    data: { phone },
    success,
    error
  });
}

//绑定会员卡
export function bindVipCard(options) {
  console.log(this);
  var {
    uid,
    card_num,
    success,
    error
  } = options;
  fetch({
    url: '/meixi/public/index.php/api/Card/addRealCard/?uid=228&card_num=1821123123123123',
    data: {},
    success,
    error
  });
}