export default {
    namespaced: true,
    state: () => (
        {
            token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhc2QiLCJwYXNzd29yZCI6IiIsIm5pY2tuYW1lIjpudWxsLCJlbWFpbCI6IjgzOTE2OTQ3MkBxcS5jb20iLCJ1c2VyX3BpYyI6IiIsInBob25lIjpudWxsLCJ2eGNvZGUiOm51bGwsImlhdCI6MTY1MTQ1Mjc5NSwiZXhwIjoxNjUxNDg4Nzk1fQ.gEqGZVAWNzJsaGD2wmwkC9vdwoqAqQ_s1xJJ7TGFgXw',
            userinfo:{}
        }
    ),
    mutations: {
        updateToken(state, obj) {
            state.token = obj
            console.log('vuex', state.token)
        },
        updataUser(state,obj) {
            console.log(obj)
            state.userinfo = obj
            console.log('vuex145', state.userinfo)     
        }
    },
    actions:{

    }

}