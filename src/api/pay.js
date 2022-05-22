import http from '@/api/utils'
import https from 'axios'

//暴露出一个请求的接口
//提交订单
export const order = (data) =>{
        return http.post('/pay/order',data)
     }
//提交订单
export const orderpay = (data) =>{
    return http.get(`/pay/orderpay?orderId=${data.orderId}&callback=${data.callback}&orderTotal=${data.orderTotal}`)
 }
//提交订单
export const getOrder = (data = "") =>{
return http.get(`/pay/getOrder?orderId=${data}`) 
    
 }
//修改订单状态
export const updataOrderState = (data) =>{
return http.post(`pay/updataOrderState`,data) 
    
 }
//删除订单
export const deleteOrder = (data) =>{
return http.post(`pay/deleteOrder`,data) 
 }
//查询物流
export const getExpress = (data) =>{
return https.post(`poll/query.do`,data) 
 }

