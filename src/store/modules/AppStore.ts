import { VuexModule, Module, Mutation } from 'vuex-module-decorators'

@Module({ namespaced: true, name: 'AppStore' })
export default class AppStore extends VuexModule {
  token = ''
  id = ''

  @Mutation
  setToken(token: string) {
    this.token = token
  }

  @Mutation
  setId(id: string) {
    this.id = id
  }
}
