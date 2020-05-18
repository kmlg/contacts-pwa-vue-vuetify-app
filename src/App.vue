<template>
  <div id="app">
    <component v-if="!isLoading" :is="defaultLayout"></component>
    <loader v-if="isLoading"></loader>
  </div>
</template>

<script>
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import Vuetify from 'vuetify'
import defaultLayout from './views/default-layout'
import Loader from './components/loader'

// Helpers
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: '#1976D2',
    secondary: '#424242',
    accent: colors.indigo.base,
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

Vue.use(VueLazyload)

export default {
  name: 'app',
  meta() {
    return {
      title: 'AddressBook entry',
      description: 'description'
    }
  },
  components: {
    defaultLayout,
    Loader
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading
    }
  },
  data() {
    return {
      defaultLayout: 'defaultLayout'
    }
  },
  created() {
    // wait for response from API first if needed (session check)
    this.$store.dispatch('disableLoading')
  }
}
</script>

<style lang="scss">
  @import "../assets/custom.css";
  @import "../assets/vuetify.min.css";
  @import './styles/declarations';
</style>