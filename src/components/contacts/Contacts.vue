<template>
  <v-container fluid mt-2>
    <v-list two-line subheader>
      <v-subheader>All Contacts</v-subheader>
      <v-list-tile v-for="contact in $store.state.contacts.list" :key="contact._id" :to="`/contact/${contact._id}`">
        <v-list-tile-action>
          <v-icon>person</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{contact.firstName}} {{contact.lastName}}</v-list-tile-title>
          <v-list-tile-sub-title>{{contact.email}}, {{contact.country}}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="!$store.state.contacts.list.length">
        <v-list-tile-content>
          <v-list-tile-sub-title>No entries</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <quick-dial></quick-dial>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import quickDial from './quick-dial'

export default {
  components: {
    quickDial
  },
  meta() {
    return {
      title: 'Contacts',
      description: 'description'
    }
  },
  computed: {
    ...mapState([
      'contact'
    ])
  },
  methods: {
    ...mapActions('contact', [
      'listContacts'
    ]),
    listContacts() {
      this.$store.dispatch('listContacts')
    }
  },
  created() {
    this.listContacts()
  }
}
</script>
<style scoped>
.application .theme--light.list, .theme--light .list {
  background: transparent !important;
}
</style>