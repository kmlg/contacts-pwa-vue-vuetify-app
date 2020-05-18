<template>
  <div>
    <v-toolbar app fixed style="z-index:0">
      <v-toolbar-title><logo fontSize="1.4rem" to="/" :y="32"></logo></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat to="/">ALL CONTACTS</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import logo from '@/components/logo'

export default {
  props: {
    source: String
  },
  components: {
    logo
  },
  computed: {
    ...mapState(['notification'])
  }
}
</script>
<style scoped>
.toolbar {
  background-color: transparent !important;
}
</style>