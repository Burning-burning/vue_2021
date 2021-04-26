export default {
  namespaced: true,
  state: {
    admin: {}
  },
  mutations: {
    setAdmin(state, val) {
      state.admin = val
    }
  }
}
