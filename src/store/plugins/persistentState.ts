import createPersistedState from 'vuex-persistedstate'

export default createPersistedState({
  paths: ['AppStore.token', 'AppStore.id'],
})
