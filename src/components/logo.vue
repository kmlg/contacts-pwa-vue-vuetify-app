<template>
  <svg :width="w" :height="h" version="1.1" xmlns = 'http://www.w3.org/2000/svg' @click="navigate">
    <text :x="x" :y="y" :style="fontStyle">
      {{name}}
    </text>
  </svg>
</template>

<script>
  export default {
    props: {
      w: {
        type: String,
        default: '85px'
      },
      h: {
        type: String,
        default: '40px'
      },
      x: {
        type: Number,
        default: 0
      },
      y: {
        type: Number,
        default: 30
      },
      fontSize: {
        type: String,
        default: '2rem'
      },
      to: {
        type: String,
        default: ''
      }
    },
    computed: {
      fontStyle() {
        return {
          fontSize: this.fontSize
        }
      }
    },
    data () {
      return {
        name: 'AddressBook'
      }
    },
    methods: {
      navigate() {
        if (this.to) {
          this.$router.push(this.to)
        }
      }
    }
  }
</script>
<style scoped>
  svg text {
    text-align: center;
    font-family: impact, georgia, times, serif;
    font-weight: normal;
    font-style: normal;
    color: #000;
    cursor: pointer;
  }
</style>
