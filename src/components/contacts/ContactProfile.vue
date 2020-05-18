<template>
  <v-container>
    <v-flex>
      <v-card>
        <v-card-media height="120px" class="blue darken-3">
          <v-layout column class="media">
            <v-spacer></v-spacer>
            <v-card-title class="white--text pl-5">
              <div class="display-1 pl-4">{{contact.firstName}} {{contact.lastName}}</div>
              <v-spacer></v-spacer>
              <v-btn dark icon class="mr-3" router :to="`/contact/${contact._id}/settings`">
                <v-icon>edit</v-icon>
              </v-btn>
            </v-card-title>
          </v-layout>
        </v-card-media>
        <v-list two-line>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="indigo">account_circle</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{contact.firstName}} {{contact.lastName}}</v-list-tile-title>
              <v-list-tile-sub-title>Contact Name</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider inset></v-divider>
          <v-list-tile v-if="contact.email">
            <v-list-tile-action>
              <v-icon color="indigo">mail</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{contact.email}}</v-list-tile-title>
              <v-list-tile-sub-title>Contact E-mail</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="contact.country">
            <v-list-tile-action>
              <v-icon color="indigo">location_on</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{contact.country}}</v-list-tile-title>
              <v-list-tile-sub-title>Contact Country</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  computed: {
    contact() {
      return this.$store.state.contacts.contact
    }
  }
}
</script>
