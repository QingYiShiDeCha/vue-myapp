import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: [
      {
        username: 'admin',
        password: 'admin',
        checkPass: 'admin',
        name: '清茶',
        sex: '1',
        phone: '13888888888',
        email: 'qingcha@qq.com',
        addr: '北京海定区'
      }
    ],
    currLoginUser: {}
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
    },
    getCurrLogin(state, data) {
      state.currLoginUser = data
      console.log(state.currLoginUser, 'state.currLogin');
    },
    setUserInfo(state, updatedUser) {
      const index = state.userInfo.findIndex(user => user.username === updatedUser.username);
      if (index !== -1) {
        // 更新用户信息
        state.userInfo[index] = {
          ...state.userInfo[index],
          ...updatedUser
        };
      }
      state.currLoginUser = updatedUser; // 更新用户信息
    }
  },
  getters: {
    getCurrUser: state => {
      return state.currLoginUser
    }
  },

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