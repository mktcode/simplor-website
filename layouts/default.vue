<template>
  <Nuxt />
</template>

<script>
export default {
  head() {
    return {
      bodyAttrs: {
        class: this.$store.state.modal.show ? 'overflow-hidden' : ''
      }
    }
  }
}
</script>
