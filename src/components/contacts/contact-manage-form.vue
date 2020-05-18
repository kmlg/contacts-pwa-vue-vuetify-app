<template>
  <v-card class="grey lighten-5 elevation-0">
    <v-card-media v-if="$store.state.flags.contacts" height="120px" class="blue darken-3">
      <v-layout column class="media">
        <v-spacer></v-spacer>
        <v-card-title class="white--text pl-5">
          <div v-if="contactId" class="display-1 pl-4">Edit Contact</div>
          <div v-else class="display-1 pl-4">Create Contact</div>
        </v-card-title>
      </v-layout>
    </v-card-media>
    <v-container class="pl-5 pr-5 pt-5">
      <v-form v-model="valid">
        <v-text-field
          v-model="firstName"
          label="First name"
          @keyup.enter="submit"
          :rules="firstNameRules"
        ></v-text-field>
        <v-text-field
          v-model="lastName"
          label="Last name"
          @keyup.enter="submit"
          :rules="lastNameRules"
        ></v-text-field>
        <v-text-field
          v-model="email"
          label="E-mail"
          @keyup.enter="submit"
          :rules="emailRules"
        ></v-text-field>

        <v-select
          :items="countriesList"
          v-model="country"
          label="Country"
          autocomplete
        ></v-select>

        <v-btn
          class="mt-4 mb-4"
          color="primary"
          @click.native="submit"
          :disabled="!valid"
        >
          <template v-if="contactId">Update Contact</template>
          <template v-else>Create Contact</template>
        </v-btn>
        <v-dialog
          v-model="deleteDialog"
          v-if="contactId"
          max-width="290">
          <v-btn
            color="red darken-1"
            dark
            slot="activator"
            >Delete Contact</v-btn>
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
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
var countries = require('country-list')()

export default {
  computed: {
    countriesList() {
      return countries.getData().map((e) => {
        return e.name
      })
    }
  },
  data () {
    return {
      deleteDialog: false,
      valid: false,
      contactId: null,
      firstName: '',
      firstNameRules: [
        v => !!v || 'Your First name is required',
        v => (v && v.length >= 3) || 'First name must be at least 3 characters'
      ],
      lastName: '',
      lastNameRules: [
        v => !!v || 'Your Last name is required',
        v => (v && v.length >= 3) || 'Last name must be at least 3 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      country: '',
      countryRules: [
        v => !!v || 'Country is required'
      ]
    }
  },
  created() {
    if (this.$store.state.contacts.contact && this.$route.params.id === this.$store.state.contacts.contact._id) {
      this.firstName = this.$store.state.contacts.contact.firstName
      this.lastName = this.$store.state.contacts.contact.lastName
      this.email = this.$store.state.contacts.contact.email
      this.country = this.$store.state.contacts.contact.country
      this.contactId = this.$store.state.contacts.contact._id
    } else if (this.contactId) {
      this.firstName = ''
      this.lastName = ''
      this.contactId = ''
      this.email = ''
      this.country = ''
    }
  },
  methods: {
    deleteContact() {
      if (this.contactId) {
        this.$emit('deleteContact')
      }
    },
    submit () {
      if (this.valid) {
        let contactData = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          country: this.country
        }
        if (this.contactId && this.$route.params.id === this.contactId) {
          contactData._id = this.$store.state.contacts.contact._id
        }
        this.$emit('submitContact', contactData)
      }
    }
  }
}
</script>
