import Vue from 'vue'
import Vuex from 'vuex'



Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    userInfo: []
  },
  mutations: {
    /**
     * 添加新用户
     * @param {object} state 
     * @param {object} data 
     */
    addUserInfo(state, data) {
      state.userInfo.push(data)
      console.log(data);
      console.log(state.userInfo, 'state');
    }
  }
})

export default store

// export default new Vuex.Store({
//   state: {},
//   getters: {},
//   actions: {},
//   mutations: {},

//   modules: {
//     tab,

//   }
// })