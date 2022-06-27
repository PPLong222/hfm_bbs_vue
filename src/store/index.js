import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: '',//可以直接通过state.token可以获取，不需要调用get
        userInfo: JSON.parse(sessionStorage.getItem("userInfo"))//parse是进行反序列化
    },
    getters: {
        //get
        getUser: state => {
            return state.userInfo;
        }
    },
    mutations: {
        //set
        SET_TOKEN: (state,token) => {
            state.token=token;
            localStorage.setItem("token",token)
        },
        SET_USERINFO: (state,userInfo) => {
            state.userInfo=userInfo;
            //sessionStorage不可以存取一个对象，只能存取一个字符
            sessionStorage.setItem("userInfo",JSON.stringify(userInfo))//stringify是序列化，把对象编程字符串
        },
        REMOVE_INFO: (state)=>{
            state.token='';
            state.userInfo={};//{}表示复制一个对象
            localStorage.setItem("token",'');
            sessionStorage.setItem("userInfo",JSON.stringify(''))
        }
    },
    actions: {
    },
    modules: {
    }
})
