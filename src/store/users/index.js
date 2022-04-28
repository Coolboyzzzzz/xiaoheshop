export default {
    namespaced: true,
    state: () => (
        {
            token: {}
        }
    ),
    mutations: {
        updateToken(state, obj) {
            state.token = obj
            console.log('vuex', state.token)
        }
    },

}