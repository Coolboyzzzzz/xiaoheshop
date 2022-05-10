
import http from '@/api/utils'

//这里面都是有token的接口


//获取用户基本信息
export const getUserInfo = () => {
return http.get('/user/getUserInfo')
}

//添加用户收货地址
export const addAddress = (data) => {
    return http.post('/user/addAddress',data)
    }

//更新用户购物车数据
export const addCart = (data) => {
    return http.post('/user/addCart',data)
    }

//得到用户购物车数据
export const getCart = () => {
    return http.get('/user/getCart')
    }

//删除指定的购物车图书

export const deleteCart = (data) => {
    return http.get('/user/deleteCart?bookid='+data)
    }

//获取用户收货地址
export const getaddress = () => {
    return http.get('/user/getaddress')
    }