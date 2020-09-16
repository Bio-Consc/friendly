<template lang="pug">
.v-container.pa-4
  v-layout
    .form-container
      v-text-field(label='token', v-model='tokenSafe')
      v-text-field(label='id', v-model='idSafe')
      v-btn(:loading='loading', @click='search') Search
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import axios from 'axios'
import { namespace } from 'vuex-class'

const AppStore = namespace('AppStore')

@Component
export default class Home extends Vue {
  @AppStore.State token!: string
  @AppStore.State id!: string
  @AppStore.Mutation setToken!: (token: string) => void
  @AppStore.Mutation setId!: (id: string) => void

  loading = false

  get tokenSafe() {
    return this.token
  }
  set tokenSafe(token: string) {
    this.setToken(token)
  }

  get idSafe() {
    return this.id
  }
  set idSafe(id: string) {
    this.setId(id)
  }

  async search() {
    this.loading = true
    try {
      const patients = (
        await axios.get(
          `https://backend.endobits.com/workspace/${this.id}/patient`,
          {
            headers: {
              authorization: `Bearer ${this.token}`,
            },
            params: {
              workspaceId: this.id,
            },
          }
        )
      ).data
      console.log(patients)
    } catch (err) {
      console.log(err)
    } finally {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>