<template>
  <div class="loader">
    <div class="logo">
      <logo to="/" :y="32"></logo>
    </div>
    <v-progress-circular :size="50" indeterminate color="primary"></v-progress-circular>
  </div>
</template>
<script>
import logo from '@/components/logo'
export default {
  components: {
    logo
  }
}
</script>
<style scoped>
.loader {
  text-align: center;
  margin: 10% auto;
}
.loader > .logo {
  display: block;
  margin-bottom: 10%;
}
</style>
