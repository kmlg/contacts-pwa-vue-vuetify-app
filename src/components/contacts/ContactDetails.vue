<template>
  <v-container>
    <component :is="activeItem"></component>
    <quick-dial @deleteContact="deleteContactDialog"></quick-dial>
    <v-dialog
      v-model="deleteDialog"
      max-width="290">
      <v-card>
        <v-card-title>Are you sure you want to delete this contact?</v-card-title>
        <v-card-text>You can't go back.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click.native="deleteDialog = false">No</v-btn>
          <v-btn color="red darken-1" flat="flat" @click.native="deleteContact">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import quickDial from './quick-dial'
import ContactProfile from './ContactProfile'

export default {
  components: {
    quickDial,
    contact: ContactProfile
  },
  data () {
    return {
      deleteDialog: false,
      activeItem: 'contact'
    }
  },
  created() {
    if (this.$route.params.tab) {
      this.activeItem = this.$route.params.tab
    }
    if (this.$route.params.id) {
      this.listContacts()
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.params.tab) {
        this.activeItem = to.params.tab
      } else {
        this.activeItem = 'account'
      }
    }
  },
  computed: {
    ...mapState([
      'contact'
    ])
  },
  methods: {
    ...mapActions('contact', [
      'getContact',
      'deleteContact'
    ]),
    deleteContactDialog() {
      this.deleteDialog = !this.deleteDialog
    },
    deleteContact() {
      this.$store.dispatch('deleteContact', { _id: this.$store.state.contacts.contact._id }).then(() => {
        this.$store.dispatch('listContacts', true).then(() => {
          if (this.$store.state.notification.success) {
            this.$router.replace('/contacts')
          }
        })
      })
    },
    listContacts() {
      this.$store.dispatch('getContact', { _id: this.$route.params.id })
    }
  }
}
</script>
<style scoped>
.container {
  padding: 0;
}
.speed-dial {
  bottom: 103px !important;
}
</style>