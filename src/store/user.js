export default {
  state: {
    userInfo: []
  },
  mutations: {
    pushInfo(state, userObj) {
      if (userInfo !== null) {
        this.state.userInfo.push(userObj)
        console.log(userInfo);
      }
    }
  }
}