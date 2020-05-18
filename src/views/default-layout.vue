<template>
  <v-app>
    <navigation></navigation>
    <v-content app clipped-left>
      <v-container fluid>
        <v-layout>
          <router-view></router-view>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer light app>
      <copyright></copyright>
    </v-footer>
    <v-snackbar
      :timeout="3000"
      :bottom="true"
      :right="true"
      :multi-line="true"
      :color="snackbarColor"
      v-model="snackbar">
      {{ $store.state.notification.text }}
      <v-btn dark flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import navigation from '@/components/navigation'
import copyright from '@/components/copyright'

export default {
  props: {
    source: String
  },
  components: {
    navigation,
    copyright
  },
  computed: {
    snackbar: {
      get () {
        return this.$store.state.notification.snackbar
      },
      set (value) {
        this.$store.commit('UPDATE_SNACKBAR', value)
      }
    },
    snackbarColor () {
      return this.$store.state.notification.context
    }
  }
}
</script>
<style scoped>
.fluid {
  margin: 0 -8px -8px 0;
  width: auto !important;
  max-width: -webkit-fill-available !important;
  padding: 0;
}
</style>