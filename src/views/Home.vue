<template lang="pug">
.v-container.pa-4
  v-layout.flex-column
    .form-container
      v-text-field(label='token', v-model='tokenSafe')
      v-text-field(label='id', v-model='idSafe')
      v-btn(:loading='loading', @click='search') Search
    v-data-table.mt-8(
      :loading='loading',
      :headers='headers',
      disable-pagination,
      :items='patients',
      hide-default-footer,
      dense
    )
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

  headers = [
    {
      text: 'Email',
      value: 'email',
    },
    {
      text: 'Total data points',
      value: 'totalDataPoints',
    },
    {
      text: 'Most recent data point',
      value: 'mostRecentDataPoint',
    },
  ]

  patients = [] as any[]

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
      this.patients = (
        await axios.get(
          `https://backend.endobits.com/admin/workspace/${this.id}/patient`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
      ).data.map((v: any) => {
        v.mostRecentDataPoint = JSON.stringify(v.mostRecentDataPoint)
        return v
      })
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
