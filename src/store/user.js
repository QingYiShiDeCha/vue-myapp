export default {
  state: {
    users: [
      { id: 1, name: 'admin', password: 'admin', checkPass: 'admin', sex: '1', email: 'admin@qq.com', phone: '13800138000', addr: '法兰西 图卢兹' }
    ],
  },
  mutations: {
    ADD_USER(state, user) {
      state.users.push(user);
      console.log(state.users, 'users');
    },
  },
  actions: {
    addUser({ commit }, user) {
      commit('ADD_USER', user);
    },
  },
  getters: {
    getUsers: state => state.users,
  },
}