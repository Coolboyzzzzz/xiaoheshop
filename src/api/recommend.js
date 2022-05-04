import http from '@/api/utils'

//获得搜索建议以及轮播图
export const banner = () =>{
    return http.get('/suggest/banner')
 }


export const suggest = (data) => {
    return http.get('/suggest/suggest?query='+data)
}