<template lang="pug">
v-app
  v-main
    router-view
</template>

<script lang="ts">
import Vue from 'vue'
import store from '@/store'
import Component from 'vue-class-component'
import { namespace } from 'vuex-class'

const AppStore = namespace('AppStore')

@Component
export default class App extends Vue {}
</script>
