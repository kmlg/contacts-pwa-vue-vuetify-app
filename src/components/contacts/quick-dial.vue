<template>
  <v-speed-dial
    v-if="isEnabled"
    v-model="fab"
    :top="false"
    :bottom="true"
    :right="true"
    :direction="'top'"
    :absolute="true"
    :transition="'slide-y-reverse-transition'"
  >
    <v-btn
      v-if="contactId"
      slot="activator"
      v-model="fab"
      color="blue darken-2"
      dark
      fab
    >
      <v-icon>person</v-icon>
      <v-icon>close</v-icon>
    </v-btn>
    <v-btn
      v-else
      slot="activator"
      v-model="fab"
      color="green"
      dark
      fab
      :to="'/contact/create'"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-btn
      v-if="contactId"
      fab
      dark
      small
      color="green"
      :to="`/contact/${contactId}/settings`"
    >
      <v-icon>edit</v-icon>
    </v-btn>
    <v-btn
      v-if="contactId"
      fab
      dark
      small
      color="indigo"
      :to="`/contact/create`"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-btn
      v-if="contactId"
      fab
      dark
      small
      color="red"
      @click="deleteContact"
    >
      <v-icon>delete</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
export default {
  computed: {
    isEnabled() {
      return true
    },
    contactId() {
      if (this.$route.params.id) {
        return this.$route.params.id
      } else {
        return null
      }
    }
  },
  data () {
    return {
      fab: false
    }
  },
  methods: {
    deleteContact() {
      this.$emit('deleteContact')
    }
  }
}
</script>
<style>
.speed-dial {
  position: absolute;
  bottom: 80px !important;
}
.btn--floating {
  position: relative;
}
</style>
