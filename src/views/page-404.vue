<template>
  <div class="page-404">
    <div class="container">
      404
    </div>
  </div>
</template>
<script>
export default {
  name: 'page-404',
  meta() {
    return {
      title: 'Page not found',
      description: 'Page not found'
    }
  },
  created() {
    if (typeof location !== 'undefined') {
      this.$log('404 ' + (this.$route.redirectedFrom || 'Not Found' + ' page at ' + location.pathname))
    }
  }
}
</script>
