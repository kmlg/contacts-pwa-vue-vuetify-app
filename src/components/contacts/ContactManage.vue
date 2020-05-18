<template>
  <v-container fluid>
    <contact-manage-form
      @submitContact="submit"
      @deleteContact="deleteContact"
    ></contact-manage-form>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ContactManageForm from './contact-manage-form.vue'

export default {
  components: {
    ContactManageForm
  },
  meta() {
    return {
      title: 'Contact create',
      description: ''
    }
  },
  data () {
    return {
      activeItem: 'settings'
    }
  },
  computed: {
    ...mapState([
      'notification'
    ])
  },
  methods: {
    ...mapActions('contact', [
      'createContact',
      'deleteContact',
      'updateContact'
    ]),
    deleteContact() {
      this.$store.dispatch('deleteContact', { _id: this.$store.state.contacts.contact._id }).then(() => {
        this.$store.dispatch('listContacts', true).then(() => {
          if (this.$store.state.notification.success) {
            this.$router.replace('/contacts')
          }
        })
      })
    },
    submit(data) {
      let action = 'createContact'
      if (data._id && this.$store.state.contacts.contact._id === data._id) {
        action = 'updateContact'
      }

      this.$store.dispatch(action, data).then(() => {
        this.$store.dispatch('listContacts', true).then(() => {
          if (this.$store.state.notification.success) {
            this.$router.replace('/contacts')
          }
        })
      })
    }
  }
}
</script>
<style scoped>
.container {
  padding: 0;
}
</style>