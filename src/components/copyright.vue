<template>
  <div class="copyright-block">
    <div class="copyright">&copy; {{ year }}. All right reserved.</div>
  </div>
</template>

<script>
export default {
  name: 'copyright',
  data() {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
  .copyright-block {
    padding-left: 1rem;
  }
</style>

