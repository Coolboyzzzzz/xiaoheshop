
import http from '@/api/utils'

export const getUserInfo = () => {
return http.get('/user/getUserInfo')
}