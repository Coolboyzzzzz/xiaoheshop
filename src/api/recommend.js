import http from '@/api/utils'

//获得搜索建议以及轮播图
export const banner = () =>{
    return http.get('/suggest/banner')
 }


export const suggest = (data) => {
    return http.get('/suggest/suggest?query='+data)
}
//获取商品详细信息
export const getBookdetail = (name) => {
    return http.get('/suggest/getBookdetail?bookname='+name)
}

export const Rank = () => {
    return http.get('/suggest/rank')
}