import http from '@/api/utils'

//暴露出一个请求的接口
//注册接口
export const register = (data) =>{
        return http.post('/api/register',data)
     }
     //用户名登录
export const login = (data) => {
    return http.post('/api/login',data)
}
//邮箱登录
export const emailLogin = (data) =>{
    return http.post('/api/emailLogin',data)
}

//邮箱验证码登录
export const emailCodeLogin =(data) => {
    return http.post('/api/emailCodeLogin',data)
}
//发送邮件
export const sendEmailapi = (data) => {
    return http.post('/api/sendEmail',data)
}
//检查邮箱验证码是否合法
export const checkEmail = (data) => {
    return http.get(`/api/checkEmail?email=${data.email}&code=${data.code}`)
}

//获取二维码字符串
export const qrCode = () =>{
    return http.get('/api/qrCode')
}

//检查二维码状态
export const changeState = (code) => {
 return http.get('/api/changeState?qrcode='+code)
}

//重置密码
export const reset = (data) => {
    return http.post('/api/reset',data)
}