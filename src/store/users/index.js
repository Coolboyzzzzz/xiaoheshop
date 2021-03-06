export default {
    namespaced: true,
    state: () => (
        {
            token: window.localStorage.getItem('token') || '',
            userinfo:{}
        }
    ),
    mutations: {
        updateToken(state, obj) {
            state.token = obj
            this.commit('m_users/saveToken',obj)
        },
        updataUser(state,obj) {
            state.userinfo = obj 
        },
        saveToken(state,obj){
            window.localStorage.setItem('token',obj)
        }
    },
    actions:{

    }

}