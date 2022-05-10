//导入获取用户地址接口
import { getaddress } from '@/api/user.js'
export default {
    namespaced: true,
    state: () => (
        {
            address: [],
            index:0
        }
    ),
    mutations: {
        updateAddress(state, obj) {
            state.address = obj
        },
        updataIndex(state,index){
            state.index = index
        }
    },
    actions: {
        async initaddress() {
            const { data: res } = await getaddress()
            if (res.code != 200) return
            this.commit('m_address/updateAddress', res.message)
        }

    }

}